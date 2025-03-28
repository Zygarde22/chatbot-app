import CONFIG from "./config.js"; // Import API key from config.js

document.addEventListener("DOMContentLoaded", loadChatHistory);

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Ignore empty messages

    displayMessage(userMessage, "user");
    userInput.value = "";

    if (!CONFIG.API_KEY) {
        displayMessage("Error: API key not available.", "bot");
        return;
    }

    displayTypingIndicator(); // Show "typing..." before response

    try {
        const response = await fetch("https://your-chatbot-api.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CONFIG.API_KEY}`, // Using imported API key
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
