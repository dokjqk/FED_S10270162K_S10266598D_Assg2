document.getElementById('scroll-button').addEventListener('click', function() {
    document.getElementById('cat-grid').scrollBy({
        left: 300, // Adjust the value as needed
        behavior: 'smooth'
    });
});

document.getElementById('scroll-left-button').addEventListener('click', function() {
    document.getElementById('cat-grid').scrollBy({
        left: -300, // Adjust the value as needed
        behavior: 'smooth'
    });
});

// Chatbox code
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");

const API_KEY = "API_KEY"; // Replace with your API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null
}

const chatbotToggler = document.querySelector("#chatbox-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
const initialInputHeight = messageInput.scrollHeight;

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

const generateBotResponse = async (incomingMesssageDiv) => {
    const messsageElement = incomingMesssageDiv.querySelector(".message-text");
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [{
                parts:[{text: userData.message}]
            }]
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.error.message);
        }
        const apiResponseText = data.candidates[0].content.parts[0].text.trim();
        messsageElement.innerText = apiResponseText
    } catch (error) {
        console.log(error);
        messsageElement.innerText = error.message;
        messsageElement.style.color = "red";

    } finally{
        incomingMesssageDiv.classList.remove("thinking");
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});

    }
};

const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";

    const messageContent = `<div class="message-text"></div>`;

    const outgoingMesssageDiv = createMessageElement(messageContent, "user-message");
    outgoingMesssageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMesssageDiv);
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});

    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                    </svg>
                    <div class="message-text">
                        <div class="thinking-indicator">
                            <dotlottie-player src="https://lottie.host/10585756-291f-4654-921b-38a60cbe861d/iij3lM8loW.lottie" background="transparent" speed="1" style="width: 50px; height: 50px" loop autoplay></dotlottie-player>
                        </div>
                    </div>`;
        const incomingMesssageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMesssageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponse(incomingMesssageDiv);
    }, 600);
};

messageInput.addEventListener("keydown", (e) =>{
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage !== "") {
        handleOutgoingMessage(e);
    }
});

messageInput.addEventListener("input", (e) => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";

})

sendMessageButton.addEventListener("click", (e) => {
    const userMessage = messageInput.value.trim();
    if (userMessage !== "") {
        handleOutgoingMessage(e);
    }
});

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

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
