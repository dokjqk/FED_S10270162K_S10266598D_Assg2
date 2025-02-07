document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.querySelector('.message-input');
    const sendMessageButton = document.querySelector('.send-message');
    const textMessages = document.querySelector('.text-messages');

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'user-message');
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-text');
            messageContent.textContent = messageText;
            messageDiv.appendChild(messageContent);
            textMessages.appendChild(messageDiv);
            messageInput.value = '';
            textMessages.scrollTop = textMessages.scrollHeight; // Scroll to the bottom
        }
    }

    sendMessageButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
});
