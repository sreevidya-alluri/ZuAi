// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database or open an existing one
const db = new sqlite3.Database("C:/Users/Vidya's/blogs.db", (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the 'posts' table if it does not exist
    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "posts" created or already exists.');
      }
    });
  }
});

module.exports = db;
