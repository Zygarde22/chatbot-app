"use strict";

// Load chat history when the page loads
window.addEventListener("load", loadChatHistory);

document.getElementById("send-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    displayMessage(userInput, "user");
    saveToLocalStorage("user", userInput); // Save user message

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        displayMessage(data.message, "bot");
        saveToLocalStorage("bot", data.message); // Save bot response
    } catch (error) {
        displayMessage("Error: Unable to get response", "bot");
        console.error("Chatbot API Error:", error);
    }

    document.getElementById("user-input").value = ""; // Clear input field
});

function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Save messages to localStorage
function saveToLocalStorage(sender, message) {
    const messages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    messages.push({ sender, message });
    localStorage.setItem("chatHistory", JSON.stringify(messages));
}

// Load messages from localStorage
function loadChatHistory() {
    const messages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    messages.forEach(({ sender, message }) => displayMessage(message, sender));
}
