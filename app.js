"use strict";

import OpenAI from "openai";
const client = new OpenAI();

// Get DOM elements
const chatContainer = document.getElementById("chat-container");
const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");

// Function to send a message and display it in the chat
async function sendMessage() {
    const message = userInput.value;
    
    if (!message) return;

    // Display the user message
    displayMessage(message, "user");

    // Store user message in localStorage
    saveToLocalStorage("user", message);

    // Get bot's response from OpenAI API
    const response = await client.responses.create({
        model: "gpt-4o",
        input: message,
    });

    const botMessage = response.output_text;

    // Display the bot's response
    displayMessage(botMessage, "bot");

    // Store bot response in localStorage
    saveToLocalStorage("bot", botMessage);

    // Clear the input field
    userInput.value = "";
}

// Function to display messages in the chat container
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to save messages to localStorage
function saveToLocalStorage(sender, message) {
    const messages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    messages.push({ sender, message });
    localStorage.setItem("chatHistory", JSON.stringify(messages));
}

// Function to load chat history from localStorage
function loadChatHistory() {
    const messages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    messages.forEach(({ sender, message }) => {
        displayMessage(message, sender);
    });
}

// Event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Load chat history when the page loads
window.addEventListener("load", loadChatHistory);
