const apiKey = "AIzaSyBWL9Qo2PyLwC6arEDcV4jD-V3dhNn7GVM";  //Yes I know this isn't safe, I've given up trying to get this to all run and doing this via render is making my head hurt.

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) {
        console.log("User message is empty");
        return;
    }

    displayMessage(userMessage, "user");
    userInput.value = "";

    displayTypingIndicator(); // Show "typing..." before response

    try {
        const response = await fetch("https://your-chatbot-api.com/send", {  // Replace this with the actual API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,  // Use the embedded API key
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        removeTypingIndicator();
        console.log("Bot response:", data);
        displayMessage(data.response, "bot");

        saveMessage(userMessage, "user");
        saveMessage(data.response, "bot");
    } catch (error) {
        removeTypingIndicator();
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}
