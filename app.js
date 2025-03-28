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
        return data.apiKey;  
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) {
        console.log("User message is empty");  // Debugging
        return; // Ignore empty messages
    }

    displayMessage(userMessage, "user");
    userInput.value = "";

    const apiKey = await fetchApiKey(); // Fetch API key from backend
    console.log("API Key:", apiKey);  // Debugging

    if (!apiKey) {
        displayMessage("Error: API key not available.", "bot");
        return;
    }

    displayTypingIndicator(); // Show "typing..." before response

    try {
        const response = await fetch("https://your-chatbot-api.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`, // Use fetched API key
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        removeTypingIndicator();
        console.log("Bot response:", data);  // Debugging
        displayMessage(data.response, "bot");

        saveMessage(userMessage, "user");
        saveMessage(data.response, "bot");
    } catch (error) {
        removeTypingIndicator();
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
