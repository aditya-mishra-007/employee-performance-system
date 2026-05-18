const Employee = require('../models/Employee');

// @desc    Add a new employee (Matches registerEmployee route import)
// @route   POST /api/employees
// @access  Private (Protected by JWT)
exports.registerEmployee = async (req, res, next) => {
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

// @desc    Search employees by department (Matches searchEmployeesByDepartment route import)
// @route   GET /api/employees/search
// @access  Public
exports.searchEmployeesByDepartment = async (req, res, next) => {
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

// @desc    Update employee performance score (Required for Q4 Test Cases)
// @route   PUT /api/employees/:id
// @access  Private (Protected by JWT)
exports.updateEmployeeScore = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id, 
            { performanceScore: Number(req.body.performanceScore) }, 
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee node not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Updated data shown',
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete employee from cluster database
// @route   DELETE /api/employees/:id
// @access  Private (Protected by JWT)
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee node not found' });
        }

        await employee.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Employee removed successfully' // Matches exact exam test case expectation
        });
    } catch (error) {
        next(error);
    }
};