const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {login, register,user} = require('../controllers/index')
const router = express.Router();

router.route('/register').get(register)


router.route('/login')
.post(login)

router.route('/user').get(user)

module.exports = router