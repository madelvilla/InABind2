const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // For environment variables
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables or default values
const PORT = 5000;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
    user: process.env.DB_USER || 'sql5720505',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || '3i9TfHycxX',
    database: process.env.DB_NAME || 'sql5720505'
});

// Promisify the pool.query method
const promisePool = pool.promise();

app.use(express.static(path.join(__dirname, '/build')));

app.get('/books', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Books');
        res.json(rows); // Send JSON response
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error'); // Send 500 error for server issues
    }
});

app.get('/coming-soon', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM ComingSoon');
        res.json(rows); // Send JSON response
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error'); // Send 500 error for server issues
    }
});

app.post('/contact', async (req, res) => {
    const { fname, lname, email, message } = req.body;
    try {
        const query = 'INSERT INTO ContactForm (firstName, lastName, email, message) VALUES (?, ?, ?, ?)';
        await promisePool.query(query, [fname, lname, email, message]);
        res.status(201).send('Message successfully sent.');
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/newsletter', async (req, res) => {
    const { email } = req.body;
    try {
        const query = 'INSERT INTO Newsletter (email) VALUES (?)';
        await promisePool.query(query, [email]);
        res.status(201).send('Subscription successful.');
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'))
});

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);
