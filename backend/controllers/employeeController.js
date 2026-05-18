const Employee = require('../models/Employee');

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Public (Will secure with JWT later)
exports.addEmployee = async (req, res, next) => {
    try {
        // Validation logic: Ensure body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, error: 'Request body cannot be empty' });
        }

        const employee = await Employee.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Employee stored successfully',
            data: employee
        });
    } catch (error) {
        next(error); // Sends error to errorHandler middleware
    }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search employees by department (Query String)
// @route   GET /api/employees/search
// @access  Public
exports.searchEmployees = async (req, res, next) => {
    try {
        const { department } = req.query;
        let query = {};

        if (department) {
            // Case-insensitive search match
            query.department = { $regex: department, $options: 'i' };
        }

        const employees = await Employee.find(query);
        
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};