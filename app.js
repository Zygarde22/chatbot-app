"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.getElementById("chat-container");

    // Function to display messages in the chat container
    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to handle sending a message
    async function sendMessage() {
        const message = userInput.value;

        if (!message) return;

        // Display the user message
        displayMessage(message, "user");

        // Send message to backend and get response
        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            const botMessage = data.message;

            // Display the bot's response
            displayMessage(botMessage, "bot");

            // Clear the input field
            userInput.value = "";
        } catch (error) {
            console.error("Error:", error);
            displayMessage("There was an error with the chatbot. Please try again.", "bot");
        }
    }

    // Event listener for the send button
    sendButton.addEventListener("click", sendMessage);

    // Optional: You could allow pressing Enter to send the message
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
