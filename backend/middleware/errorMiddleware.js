const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log the error to the console for the developer
    console.error(err);

    // Mongoose Duplicate Key Error (e.g., Duplicate Email)
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'Duplicate email: An employee with this email already exists.'
        });
    }

    // Mongoose Validation Error (e.g., Missing performance score)
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    // Default Fallback Server Error
    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;