document.addEventListener('DOMContentLoaded', function () {
    const socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('message', function (msg) {
        addMessage(msg, 'received');
    });
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== '') {
        addMessage(message, 'sent');
        socket.emit('message', message);
        messageInput.value = '';
    }
}

function addMessage(message, type) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = type === 'sent' ? 'sent-message' : 'received-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
