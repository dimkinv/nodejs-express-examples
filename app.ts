import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

const app = express()
const httpd = http.createServer(app);
const socket = io(httpd);

app.use('/', express.static('public'));

httpd.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
