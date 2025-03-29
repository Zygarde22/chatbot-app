require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // This line is necessary to enable CORS
app.use(express.json());

app.post("/get-api-key", (req, res) => {
    res.json({ apiKey: process.env.GEMINI_API_KEY }); // Send API key in the "apiKey" field
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
if (!process.env.GEMINI_API_KEY) {
    console.error("API key is missing in .env file.");
    process.exit(1); // Exit the process if API key is not found
}