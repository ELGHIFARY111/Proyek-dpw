// chat.js

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat');
    const chatWindow = document.getElementById('chatWindow');
    const sendButton = document.getElementById('kirim');

    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatWindow.appendChild(messageElement);
            chatInput.value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    });
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});
