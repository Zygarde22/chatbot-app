const express = require("express");
const OpenAI = require("openai");
const app = express();
const port = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use an environment variable for security
});

app.use(express.json());

// POST endpoint to handle chatbot interactions
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await client.responses.create({
            model: "gpt-4o",
            input: message,
        });

        res.json({ message: response.output_text });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ message: "Error with the chatbot." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
