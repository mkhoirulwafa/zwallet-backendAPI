const authController = require('../controllers/authController')
const router = require('express').Router()

const { authorization } = require("../middlewares/authorization");

router.post('/register', authController.register)
router.post('/login', authController.login)
router.patch('/reset-password', authController.checkEmail)
router.patch('/reset-password/new-password', authController.resetPassword)

module.exports = router