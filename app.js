async function sendMessage() {
    const message = userInput.value;

    if (!message) return;

    // Display the user message
    displayMessage(message, "user");

    // Store user message in localStorage
    saveToLocalStorage("user", message);

    try {
        // Send message to server (backend)
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

        // Store bot response in localStorage
        saveToLocalStorage("bot", botMessage);
    } catch (error) {
        console.error("Error:", error);
        displayMessage("There was an error with the chatbot. Please try again.", "bot");
    }

    // Clear the input field
    userInput.value = "";
}
