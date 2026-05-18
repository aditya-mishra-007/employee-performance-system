const express = require('express');
const router = express.Router();
const { 
    addEmployee, 
    getAllEmployees, 
    searchEmployees 
} = require('../controllers/employeeController');

// 1. Import the protection middleware at the top
const { protect } = require('../middleware/authMiddleware');

// Route for searching employees - matches: /api/employees/search?department=Development
router.route('/search').get(searchEmployees);

// Root collection routes - matches: /api/employees
router.route('/')
    .post(protect, addEmployee) // 2. Add 'protect' right here to secure employee creation
    .get(getAllEmployees);       // This remains public so anyone can view (or add protect here too if needed)

    

// Route matches: PUT /api/employees/:id and DELETE /api/employees/:id
router.route('/:id')
    .delete(protect, deleteEmployee); // Secures data elimination with JWT verification

module.exports = router;