const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const authRouter= express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)


module.exports = authRouter;