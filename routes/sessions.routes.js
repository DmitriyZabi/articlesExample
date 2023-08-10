const googleOauthHandler = require('../controllers/auth.controller')
const { Router } = require('express')
const router = Router()

router.get('/oauth/google', googleOauthHandler)

module.exports = router
