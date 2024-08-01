const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router
    .post('/', registerUser)
    .post('/login', loginUser)
    .get('/me', protect, getMe)

module.exports = router