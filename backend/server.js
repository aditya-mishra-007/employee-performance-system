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

// Mount Employee Routes
app.use('/api/employees', require('./routes/employeeRoutes'));

// Add this line with your other route mounts (around line 24 of your original server.js)
app.use('/api/auth', require('./routes/authRoutes'));

// Mount AI Analysis Engine
app.use('/api/ai', require('./routes/aiRoutes'));

// Mount Centralized Error Handler (MUST be placed after routes)
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in production mode on port ${PORT}`);
});