import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

const app = express()
const httpd = http.createServer(app);
const ioServer = io(httpd);
ioServer.on('connection', (socket)=>{
    socket.on('messageToServer', (message)=>{
        console.log(message);
        socket.broadcast.emit('messageFromServer', message);
    });
})

app.use('/', express.static('public'));

httpd.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
