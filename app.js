"use strict";

// Load chat history when the page loads
window.addEventListener("load", loadChatHistory);

document.getElementById("send-button").addEventListener("click", sendMessage);

// Allow "Enter" key to send messages
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();

    if (!userInput) return;

    displayMessage(userInput, "user");
    saveToLocalStorage("user", userInput); // Save user message

    try {
        const response = await fetch("http://localhost:3000/chat", { // Ensure correct backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();

        if (data.message) {
            displayMessage(data.message, "bot");
            saveToLocalStorage("bot", data.message); // Save bot response
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        displayMessage("Error: Unable to get response", "bot");
        console.error("Chatbot API Error:", error);
    }

    userInputField.value = ""; // Clear input field
}

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

// Optional: Clear chat button
document.getElementById("clear-chat")?.addEventListener("click", () => {
    localStorage.removeItem("chatHistory");
    document.getElementById("chat-container").innerHTML = "";
});
