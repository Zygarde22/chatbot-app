const express = require("express");
const CONFIG = require("./config.js"); // Import the config file

const app = express();
const port = 3000;

app.use(express.json());

app.post("/get-api-key", (req, res) => {
    if (!CONFIG.API_KEY) {
        return res.status(500).json({ error: "API key not found" });
    }
    res.json({ message: CONFIG.API_KEY });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
