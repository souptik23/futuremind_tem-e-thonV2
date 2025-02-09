const { signup, login, registerChallenge, registerVerify, loginChallenge, loginVerify } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// New WebAuthn routes
router.post('/register-challenge', registerChallenge);
router.post('/register-verify', registerVerify);
router.post('/login-challenge', loginChallenge);
router.post('/login-verify', loginVerify);

module.exports = router;