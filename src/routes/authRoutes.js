const authController = require('../controllers/authController')
const router = require('express').Router()

const { authorization } = require("../middlewares/authorization");

router.post('/register', authController.register)
router.get('/login', authController.login)

module.exports = router