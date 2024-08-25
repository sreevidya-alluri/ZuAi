const express = require('express');
const router = express.Router();
const db = require('../database');
const path = require("path");

console.log('Using database file:', path.resolve(__dirname, 'blogs.db'));

router.get('/', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});


// GET /posts/:id - Fetch a specific post by ID
// Example Express.js route
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    });
});

  

// POST /posts - Create a new post
router.post('/', (req, res) => {
    const { name, description } = req.body;
    db.run('INSERT INTO posts (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// PUT /posts/:id - Update a post by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate the input
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    // Execute the update query
    console.log("Before updating:", name)
    db.run('UPDATE posts SET name = ?, description = ? WHERE id = ?', [name, description, id], function(err) {
        if (err) {
            // Handle SQL errors
            return res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            // No rows were updated, possibly because the ID doesn't exist
            return res.status(404).json({ message: 'Post not found' });
        } else {
            // Successful update
            return res.json({ message: 'Post updated successfully' });
            console.log("After updating", name, description)
        }
    });
});


// DELETE /posts/:id - Delete a post by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    });
});

module.exports = router;
