require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Score = require('./models/Score');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/typesprint';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) return;
        
        console.log(`🔌 Connecting to MongoDB...`);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
    }
};

// Connect immediately for local server, but function will also await it
connectDB();

mongoose.connection.on('error', err => {
    console.error('❌ MongoDB Runtime Error:', err.message);
});

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', msg: 'Server is running' });
});

// Save Score
app.post('/api/scores', async (req, res) => {
    await connectDB(); // Ensure connection for serverless
    try {
        const { name, wpm, accuracy, difficulty, mode } = req.body;
        
        if (!name || wpm === undefined || accuracy === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newScore = new Score({
            name,
            wpm,
            accuracy,
            difficulty,
            mode
        });

        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// Get Leaderboard Routes
// Get Leaderboard Routes
app.get('/api/scores', async (req, res) => {
    await connectDB();
    try {
        const { page = 1, limit = 10, difficulty } = req.query;
        
        let query = {};
        if (difficulty && difficulty !== 'all') {
            query.difficulty = difficulty;
        }

        const count = await Score.countDocuments(query);
        const scores = await Score.find(query)
            .sort({ wpm: -1, accuracy: -1, date: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
            
        res.json({
            scores,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalScores: count
        });
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Only listen if run directly (Local Development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
