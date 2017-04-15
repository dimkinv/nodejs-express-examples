window.on

var socket = io();
socket.on('connection', function () {
    console.log('connected to server');
});

function onSendClick(){
    socket.emit('')
}
