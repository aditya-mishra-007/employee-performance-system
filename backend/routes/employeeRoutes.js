const express = require('express');
const router = express.Router();
const { 
    getAllEmployees, 
    registerEmployee, 
    searchEmployeesByDepartment,
    updateEmployeeScore,
    deleteEmployee // 🔥 FIXED: This explicit import was missing from your top list!
} = require('../controllers/employeeController');

const { protect } = require('../middleware/authMiddleware');

// Base collection endpoints
router.route('/')
    .get(getAllEmployees)
    .post(protect, registerEmployee);

// Specialized query search route parameters
router.route('/search')
    .get(searchEmployeesByDepartment);

// Parameter-isolated target item modification and deletion workflows
router.route('/:id')
    .put(protect, updateEmployeeScore)
    .delete(protect, deleteEmployee);

module.exports = router;