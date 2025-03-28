document.addEventListener("DOMContentLoaded", loadChatHistory);

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

async function fetchApiKey() {
    try {
        const response = await fetch("http://localhost:3000/get-api-key", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.message; // API key
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Ignore empty messages

    displayMessage(userMessage, "user");
    userInput.value = "";

    const apiKey = await fetchApiKey();
    if (!apiKey) {
        displayMessage("Error: Unable to retrieve API key.", "bot");
        return;
    }

    displayTypingIndicator(); // Show "typing..." before response

    try {
        const response = await fetch("https://your-chatbot-api.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        removeTypingIndicator();
        displayMessage(data.response, "bot");

        saveMessage(userMessage, "user");
        saveMessage(data.response, "bot");
    } catch (error) {
        removeTypingIndicator();
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function displayTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.id = "typing-indicator";
    typingElement.classList.add("message", "bot");
    typingElement.textContent = "Chatbot is typing...";
    chatContainer.appendChild(typingElement);
}

function removeTypingIndicator() {
    const typingElement = document.getElementById("typing-indicator");
    if (typingElement) typingElement.remove();
}

function saveMessage(message, sender) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ message, sender });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(chat => displayMessage(chat.message, chat.sender));
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
