const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// CSP Header to allow Google Fonts
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com");
    next();
});

// Send index.html for all requests to support client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
