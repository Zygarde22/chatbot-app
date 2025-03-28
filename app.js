async function fetchApiKey() {
    try {
        const response = await fetch("http://localhost:3000/get-api-key", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.message; // API key
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}

async function sendMessageToChatbot(userMessage) {
    const apiKey = await fetchApiKey();
    if (!apiKey) {
        console.error("No API key available");
        return;
    }

    const response = await fetch("https://your-chatbot-api.com/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    console.log("Bot response:", data);
}
