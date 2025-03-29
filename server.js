const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/send-message", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",  // Or the model you're using
            contents: userMessage,
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error("Error in API call:", error);
        res.status(500).json({ response: "Error: Unable to process the message." });
    }
});
