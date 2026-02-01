const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'candidate_ranking'
});

// Get top 10 leaderboard
app.get('/leaderboard', async (req, res) => {
    const [rows] = await pool.query(`
        SELECT c.id, c.name, c.experience, c.skills, r.overall_score, r.rank
        FROM candidates c
        JOIN rankings r ON c.id = r.candidate_id
        ORDER BY r.rank ASC
        LIMIT 10
    `);
    res.json(rows);
});

// Get all for heatmap (scores)
app.get('/heatmap', async (req, res) => {
    const [rows] = await pool.query(`
        SELECT c.name, e.crisis_management, e.sustainability, e.team_motivation
        FROM candidates c
        JOIN evaluations e ON c.id = e.candidate_id
    `);
    res.json(rows);
});

// Get candidate details by ID
app.get('/candidate/:id', async (req, res) => {
    const [rows] = await pool.query(`
        SELECT c.*, e.*, r.*
        FROM candidates c
        JOIN evaluations e ON c.id = e.candidate_id
        JOIN rankings r ON c.id = r.candidate_id
        WHERE c.id = ?
    `, [req.params.id]);
    res.json(rows[0]);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));