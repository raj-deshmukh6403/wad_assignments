const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Needed to serve static files
const dbConfig = require('./config/database.config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('DB Connection Error:', err));

// Serve static files (index.html, css, js) from ./public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/users', require('./routes/user.routes'));

// Fallback to index.html for root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
