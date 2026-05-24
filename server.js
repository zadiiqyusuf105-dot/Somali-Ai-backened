const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Halkan ayaan ku xiraynaa inuu website-kaaga oo kaliya aqbalo
app.use(cors({
    origin: 'https://zadiiqyusuf105-dot.github.io' 
}));

app.use(express.json());

app.post('/api/gemini', async (req, res) => {
    const userMsg = req.body.prompt;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: userMsg }] }] })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Khalad baa dhacay" });
    }
});

app.listen(process.env.PORT || 3000);

