const express = require('express');
const cors = require('cors');
const path = require('path');
const { connect } = require('./config/database.js');
const apiRoutes = require('./routes/index.js');
const { PORT } = require('./config/serverconfig.js');
const message = require('./routes/messageRoutes.js');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// API Routes
app.use('/api', apiRoutes);
app.use('/api', message);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start Server
const setupAndStartServer = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(" Error starting server:", error);
    }
};

setupAndStartServer();
