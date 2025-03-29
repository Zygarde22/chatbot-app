"use strict";

document.getElementById("send-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    displayMessage(userInput, "user");

    const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    displayMessage(data.message, "bot");
});

function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
