const express = require("express");
const app = express();
const { GoogleGenAI } = require("@google/genai");

app.use(express.json());  // to parse JSON request bodies

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

const port = process.env.PORT || 3000;  // Use the Render-provided port or fallback
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
