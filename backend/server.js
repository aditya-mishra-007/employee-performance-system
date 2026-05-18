const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment configurations
dotenv.config();

// Initialize Database connection
connectDB();

const app = express();

// Body parser middleware to handle incoming JSON bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing (Critical for Frontend Integration)
app.use(cors());

// 🔥 NEW: Root Route Health Check for Render Deployment Verification
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        status: "API Instance Active",
        message: "AI-Driven Employee Performance System server engine is running cleanly.",
        timestamp: new Date()
    });
});

// Mount Employee, Auth, and AI Routes
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Mount Centralized Error Handler (MUST be placed after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in production mode on port ${PORT}`);
});