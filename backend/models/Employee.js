const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Prevents duplicate email test-case failure
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    skills: {
        type: [String], // Array of strings for skills
        default: []
    },
    performanceScore: {
        type: Number,
        required: [true, 'Performance score is required'], // Missing score test-case validation
        min: [0, 'Score cannot be less than 0'],
        max: [100, 'Score cannot exceed 100']
    },
    experience: {
        type: Number,
        required: [true, 'Years of experience is required'],
        min: [0, 'Experience cannot be negative']
    }
}, {
    timestamps: true // Automatically tracks createdAt and updatedAt
});

module.exports = mongoose.model('Employee', EmployeeSchema);