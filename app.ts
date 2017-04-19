import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import { SearchService } from './services/search.service';
import { apiRouter } from './controllers';
import { Message } from './models/message.model';
import { CharacterResponse } from './models/character-response.model';

const app = express()
const httpd = http.createServer(app);
const ioServer = io(httpd);
const search = new SearchService();

app.use(bodyParser());
app.use('/api', apiRouter);

ioServer.on('connection', (socket) => {
    socket.on('messageToServer', async (message: Message) => {
        if (message.content.startsWith('!char')) {
            const searchParam = message.content.split('!char')[1].trim();
            const ids = await search.getCharacterIds(searchParam);

            let promises: Promise<CharacterResponse>[] = [];
            for (let id of ids) {
                promises.push(search.getCharacterInfoById(id));
            }
            const results = await Promise.all(promises);
            for (let result of results) {
                ioServer.emit('messageFromServer', new Message('bot', `${result.name} is born at ${result.birthday}`));
            }
        }
        socket.broadcast.emit('messageFromServer', message);
    });
})

app.use('/', express.static('public'));

httpd.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
