const express = require('express');
const { testUserController } = require('../controllers/testController');

// Create a router object
const router = express.Router();

// Define the route for GET requests to /test-user
router.get('/test-user', testUserController);

// Export the router
module.exports = router;
