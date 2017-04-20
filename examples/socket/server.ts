import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import * as classes from '../multiple_files';
import { controllersRouter } from './controllers';

const app = express();
const httpd = http.createServer(app);
const ioServer = io(httpd);

app.use(bodyParser());
app.use((req, res, next) => {

    next();
})
// app.use('/api', controllersRouter);
app.use('/api', [bodyParser()], controllersRouter);

let stockInterestedClients = []
ioServer.on('connection', (socket) => {

    socket.emit('messageFromServer', 'hello');
    //socket.broadcast.emit
    //ioServer.emit
    socket.on('setupStock', (stock) => {
        console.log(stock);

        stockInterestedClients.push({ stock: stock, client: socket });
    });
})



//googel updated one a second
setInterval(() => {
    let newStockVal = Math.random();
    const googleRelatedClient = stockInterestedClients.filter((client) => {
        return client.stock === 'google';
    });

    googleRelatedClient.forEach((user) => {
        user.client.emit('messageFromServer', newStockVal);
    });
}, 1000)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

httpd.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
