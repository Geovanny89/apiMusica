const express = require('express');
const router = express.Router();

const { validatorRegister, validatorLogin } = require('../validators/auth');
const {registerCtrl,loginCtrl}= require('../controller/auth')

// http://localhost:3001/api/auth/register

router.post('/register', validatorRegister,registerCtrl)
router.post('/login', validatorLogin,loginCtrl)


module.exports = router 