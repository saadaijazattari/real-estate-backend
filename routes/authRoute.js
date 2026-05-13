const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const authRouter= express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)


module.exports = authRouter;