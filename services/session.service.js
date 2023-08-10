const axios = require('axios')
const qs = require('qs')
const config = require('config')
const jwt = require('jsonwebtoken')

const createJwtToken = (email) =>
  jwt.sign({ email: email }, config.get('jwtSecret'), {
    expiresIn: `${config.get('jwtExpiresIn')}m`,
  })

const getGoogleOauthToken = async ({ code }) => {
  const rootURl = 'https://oauth2.googleapis.com/token'

  const options = {
    code,
    client_id: config.get('googleClientId'),
    client_secret: config.get('googleClientSecret'),
    redirect_uri: config.get('googleClientRedirect'),
    grant_type: 'authorization_code',
  }

  try {
    const { data } = await axios.post(rootURl, qs.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return data
  } catch (err) {
    console.log('Failed to fetch Google Oauth Tokens')
    throw new Error(err)
  }
}

async function getGoogleUser({ id_token, access_token }) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )

    return data
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}

module.exports = { getGoogleOauthToken, getGoogleUser, createJwtToken }
