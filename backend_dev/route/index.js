const express = require('express');

const {login, register,users,logout} = require('../controllers/index')
const router = express.Router();

router.route('/register')
.post(register);


router.route('/login')
.post(login);

router.route('/user')
.get(users);
router.route('/logout').post(logout);

module.exports = router