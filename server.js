import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());

// API endpoint to generate content
app.post('/send-message', async (req, res) => {
  try {
    const userMessage = req.body.message; // The user's message sent from frontend
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userMessage,
    });

    res.json({ response: response.text });  // Send back the generated response
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Unable to connect to Gemini API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
