"use strict"

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) {
        console.log("User message is empty");
        return;
    }

    // Display user message
    displayMessage(userMessage, "user");

    // Store the user message in localStorage
    saveMessage(userMessage, "user");

    userInput.value = "";

    // Show typing indicator
    displayTypingIndicator();

    try {
        const response = await fetch("http://localhost:3000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        removeTypingIndicator();

        console.log("Bot response:", data);
        displayMessage(data.response, "bot");

        // Save bot's response to localStorage
        saveMessage(data.response, "bot");

    } catch (error) {
        removeTypingIndicator();
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}

// Function to save messages in localStorage
function saveMessage(message, sender) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ message, sender });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Function to display messages on the page
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

// Function to load chat history from localStorage
function loadChatHistory() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(({ message, sender }) => {
        displayMessage(message, sender);
    });
}

// Function to display typing indicator
function displayTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator";
    typingIndicator.textContent = "Bot is typing...";
    chatContainer.appendChild(typingIndicator);
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Load chat history when the page loads
document.addEventListener("DOMContentLoaded", loadChatHistory);

// Event listeners for sending the message
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
