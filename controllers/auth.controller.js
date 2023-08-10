const {
  getGoogleOauthToken,
  getGoogleUser,
} = require('../services/session.service')
const config = require('config')
const db = require('../models')
const shortid = require('shortid')

const googleOauthHandler = async (req, res) => {
  try {
    const code = req.query.code
    const pathUrl = req.query.state || '/'

    if (!code) {
      return res.status(401).json({
        status: 'fail',
        message: 'Authorization code not provided!',
      })
    }

    const { id_token, access_token } = await getGoogleOauthToken({ code })

    const { name, verified_email, email } = await getGoogleUser({
      id_token,
      access_token,
    })

    if (!verified_email) {
      return res.status(403).json({
        status: 'fail',
        message: 'Google account not verified',
      })
    }

    const hash = shortid.generate()

    let user = await db.user.findOne({
      where: { email: email },
    })

    user = !user
      ? await db.user.create({
          email: email,
          name: name,
          provider: 'Google',
          hash: hash,
        })
      : await db.user.update(
          {
            name: name,
            hash: hash,
          },
          {
            where: {
              email: email,
            },
          }
        )

    if (!user) return res.redirect(`${config.get('baseUrl')}/oauth/error`)

    const coockieExpires = new Date(
      Date.now() + config.get('jwtExpiresIn') * 60 * 1000
    )

    res.cookie('hash', hash, {
      expires: coockieExpires,
      httpOnly: true,
    })

    res.cookie('email', email, {
      expires: coockieExpires,
      httpOnly: true,
    })

    res.redirect(`${config.get('baseUrl')}${pathUrl}`)
  } catch (err) {
    console.log('Failed to authorize Google User', err)
    return res.redirect(`${config.get('baseUrl')}/oauth/error`)
  }
}

module.exports = googleOauthHandler
