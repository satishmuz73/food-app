const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// routes
// GET USER || GET
router.get('/getUser',authMiddleware, getUserController);

// Update Profile
router.put('/updateUser',authMiddleware, updateUserController);

//Password update
router.post('/updatePassword',authMiddleware, updatePasswordController);

// Reset Password
router.post('/restPassword',authMiddleware, resetPasswordController)

// Delete user
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports = router;
