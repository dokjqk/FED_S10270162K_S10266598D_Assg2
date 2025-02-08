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

    function updateChatDetails(chatElement) {
        const userRight = document.querySelector('.user-chat.user-right');
        const listingImage = chatElement.querySelector('.image-listing-chat img').src;
        const profileImage = chatElement.querySelector('.image-user-chat img').src;
        const username = chatElement.querySelector('.user-chat-info h4').textContent;
        const listingTitle = chatElement.querySelector('.user-chat-info p').textContent;
        const listingPrice = chatElement.querySelector('.user-chat-info p:nth-child(3)').textContent;

        userRight.querySelector('.image-listing-chat img').src = listingImage;
        userRight.querySelector('.image-user-chat img').src = profileImage;
        userRight.querySelector('.user-chat-info h3').textContent = listingTitle;
        userRight.querySelector('.user-chat-info p').textContent = listingPrice;
        userRight.querySelector('.image-user-chat h4').textContent = username;
    }

    function addChatEventListeners(chat) {
        chat.addEventListener('click', function() {
            updateChatDetails(chat);
            document.querySelectorAll('.text-messages .message:not(.initial)').forEach(message => {
                message.remove();
            });
            document.querySelectorAll('.send-offer').forEach(button => {
                button.textContent = 'Send Offer';
            });
        });
    }

    document.querySelectorAll('.user-chat').forEach(chat => {
        addChatEventListeners(chat);
    });

    document.querySelectorAll('.send-offer').forEach(button => {
        button.addEventListener('click', function() {
            button.textContent = 'Offer Sent';
            const userRight = document.querySelector('.user-chat.user-right');
            const listingTitle = userRight.querySelector('.user-chat-info h3').textContent;
            const listingPrice = userRight.querySelector('.user-chat-info p').textContent;

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'user-message');
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-text');
            messageContent.innerHTML = `<h3>Send Offer</h3><h3>${listingTitle}</h3><p>${listingPrice}</p>`;
            messageDiv.appendChild(messageContent);
            document.querySelector('.text-messages').appendChild(messageDiv);

            setTimeout(() => {
                const responseDiv = document.createElement('div');
                responseDiv.classList.add('message', 'bot-message');
                const responseContent = document.createElement('div');
                responseContent.classList.add('message-text');
                responseContent.innerHTML = `<h3>Offer accepted</h3><h3>${listingTitle}</h3><p>${listingPrice}</p>`;
                responseDiv.appendChild(responseContent);
                document.querySelector('.text-messages').appendChild(responseDiv);
            }, 2000);
        });
    });

    document.querySelectorAll('.image-user-chat').forEach(image => {
        image.addEventListener('click', function() {
            document.querySelectorAll('.text-messages .message:not(.initial)').forEach(message => {
                message.remove();
            });
            document.querySelectorAll('.send-offer').forEach(button => {
                button.textContent = 'Send Offer';
            });
        });
    });

    const newChatData = localStorage.getItem('newChat');
    if (newChatData) {
        const chatData = JSON.parse(newChatData);
        const newChatDiv = document.createElement('div');
        newChatDiv.classList.add('user-chat');
        newChatDiv.innerHTML = `
            <div class="image-user-chat">
                <img src="${chatData.profileImage}" alt="Profile Picture">
            </div>
            <div class="user-chat-info">
                <h4>${chatData.username}</h4>
                <p>${chatData.listingTitle}</p>
                <p>${chatData.listingPrice}</p>
            </div>
            <div class="image-listing-chat">
                <img src="${chatData.listingImage}" alt="Listing Image">
            </div>
        `;
        document.querySelector('.messages-left').appendChild(newChatDiv);
        addChatEventListeners(newChatDiv); // Add event listener to the new chat
        localStorage.removeItem('newChat');
    }

    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
        alert('You need to be logged in to access this page.');
        window.location.href = '../index.html';
    }
});

function updateNavLinks() {
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link'); // Add this line

    if (username) {
        // If username exists, hide login and register links, show profile and logout links
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block'; // Add this line
    } else {
        // If username does not exist, show login and register links, hide profile and logout links
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
        logoutLink.style.display = 'none'; // Add this line
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateNavLinks);

document.getElementById('logout-link').addEventListener('click', function() {
    localStorage.removeItem('username');
    updateNavLinks();
});