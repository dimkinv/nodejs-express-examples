window.onload = () => {
    const $messages = document.getElementById('messages');
    const $newMessage = document.getElementById('newMessage');
    const $nickname = document.getElementById('nickname');
    const $sendNewMessage = document.getElementById('sendNewMessageBtn');

    $sendNewMessage.addEventListener('click', onSendClicked);
    $newMessage.addEventListener('keydown', e => e.keyCode === 13 ? onSendClicked() : console.log(e));

    var socket = io();
    socket.on('connection', function () {
        console.log('connected to server');
    });

    socket.on('messageFromServer', (message) => {
        addMessage(message);
        console.info(`message from ${message.from} with content ${message.content}`);
    });

    function onSendClicked() {
        const message = { from: $nickname.value, content: $newMessage.value };
        addMessage(message);

        socket.emit('messageToServer', message);
        $newMessage.value = '';
    }

    function addMessage(message){
        const $messageContainer = document.createElement('div');
        $messageContainer.innerHTML = `${message.from}: ${message.content}`;
        $messages.appendChild($messageContainer);
    }

}