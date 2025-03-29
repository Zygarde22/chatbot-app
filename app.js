const apiKey = "AIzaSyBWL9Qo2PyLwC6arEDcV4jD-V3dhNn7GVM";  // Yes, I know this isn't safe, I've given up.

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) {
        console.log("User message is empty");
        return;
    }

    // Display user message
    displayMessage(userMessage, "user");
    userInput.value = "";

    // Display typing indicator
    displayTypingIndicator();

    try {
        const response = await fetch("https://your-chatbot-api.com/send", {  // Replace this with the actual API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        removeTypingIndicator();  // Remove typing indicator after response
        console.log("Bot response:", data);

        // Display bot message
        displayMessage(data.response, "bot");

        // Save messages (optional)
        saveMessage(userMessage, "user");
        saveMessage(data.response, "bot");

    } catch (error) {
        removeTypingIndicator();  // Remove typing indicator on error
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}

// Example implementations for missing functions:

function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

function displayTypingIndicator() {
    const chatContainer = document.getElementById("chat-container");
    const typingElement = document.createElement("div");
    typingElement.classList.add("message", "bot", "typing");
    typingElement.innerText = "Typing...";
    chatContainer.appendChild(typingElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

function removeTypingIndicator() {
    const typingElement = document.querySelector(".typing");
    if (typingElement) {
        typingElement.remove();
    }
}

function saveMessage(message, sender) {
    console.log(`Saved ${sender} message: ${message}`);
    
}
