const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(cors());  // This enables cross-origin requests

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:');

// Create tables and seed data
db.serialize(() => {
    db.run(`
        CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            name TEXT
        )
    `);
    db.run(`
        CREATE TABLE equipment (
            id INTEGER PRIMARY KEY,
            name TEXT
        )
    `);
    db.run(`
        CREATE TABLE bookings (
            id INTEGER PRIMARY KEY,
            room_id INTEGER,
            date TEXT,
            equipment_ids TEXT,
            FOREIGN KEY(room_id) REFERENCES rooms(id)
        )
    `);

    // Insert sample rooms
    db.run("INSERT INTO rooms (name) VALUES ('Mediana'), ('Grande'), ('Muy Grande')");

    // Insert sample equipment
    db.run("INSERT INTO equipment (name) VALUES ('Projector'), ('Whiteboard'), ('Speaker')");
});

// Routes

// Get all rooms
app.get('/api/rooms', (req, res) => {
    db.all("SELECT * FROM rooms", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get available slots for a room
app.get('/api/rooms/:roomId/available-slots', (req, res) => {
    const { roomId } = req.params;
    const { date } = req.query; // "YYYY-MM-DD" format

    // Here, you'll need to check the database or your booking system to determine the available hours
    // For example, check if a room is available at specific hours on that day:
    const availableSlots = ["09:00", "10:00", "14:00", "15:00"]; // Example data
    res.json({ availableSlots });
});

// Get all equipment
app.get('/api/equipment', (req, res) => {
    db.all("SELECT * FROM equipment", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Create a booking
app.post('/api/bookings', (req, res) => {
    const { roomId, date, equipment } = req.body;
    const equipmentIds = equipment.join(',');  // Join equipment IDs into a comma-separated string

    db.run(
        "INSERT INTO bookings (room_id, date, equipment_ids) VALUES (?, ?, ?)",
        [roomId, date, equipmentIds],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ bookingId: this.lastID });
        }
    );
});

// Get all bookings (for debugging purposes)
app.get('/api/bookings', (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
