const db = require('../models')
const cookieParser = require('cookie-parser')
const { createJwtToken } = require('../services/session.service')
const { Router } = require('express')
const config = require('config')

const router = Router()

router.use(cookieParser())

router.get('/checkLogin', async (req, res) => {
  try {
    const { email, hash } = req.cookies
    if (email && hash) {
      const findUser = await db.user.findOne({
        where: {
          email: email,
          hash: hash,
        },
      })
      if (findUser) {
        const token = createJwtToken(findUser.email)

        return res.status(201).json({
          isAuthenticated: true,
          email: findUser.email,
          name: findUser.name,
          token: token,
        })
      }
    }
    res.status(201).json({
      isAuthenticated: false,
      email: null,
      name: null,
      token: null,
    })
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong, please try again' })
  }
})

router.get('/logout', async (req, res, next) => {
  res.cookie('email', null, { maxAge: 0, httpOnly: true })
  res.cookie('hash', null, { maxAge: 0, httpOnly: true })
  next()
  res.redirect(config.get('baseUrl'))
})

module.exports = router
