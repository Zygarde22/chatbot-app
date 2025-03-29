const express = require("express");
const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config(); // Load API key from .env file

const app = express();
const port = 3000;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use the key from .env file
});

app.use(express.json());

// Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
    const userInput = req.body.message;

    if (!userInput) {
        return res.status(400).send("No message provided.");
    }

    try {
        const response = await openai.completions.create({
            model: "gpt-4o",
            prompt: userInput,
            max_tokens: 150,
        });

        res.json({ message: response.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send("Error communicating with OpenAI API.");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
