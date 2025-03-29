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
        const response = await fetch("http://localhost:3000/send-message", {  // Use your backend URL here
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

        saveMessage(userMessage, "user");
        saveMessage(data.response, "bot");
    } catch (error) {
        removeTypingIndicator();
        console.error("Error sending message:", error);
        displayMessage("Error: Unable to connect to chatbot.", "bot");
    }
}
