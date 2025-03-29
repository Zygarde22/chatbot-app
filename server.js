"use strict";

require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Google Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

// POST endpoint to handle chatbot interactions
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        // Choose a Gemini model (e.g., gemini-pro)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Get AI response
        const result = await model.generateContent(message);
        const responseText = result.response.candidates[0]?.content.parts[0]?.text || "I didn't understand that.";

        res.json({ message: responseText });
    } catch (error) {
        console.error("Error with Gemini API:", error);
        res.status(500).json({ message: "Error with the chatbot." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
