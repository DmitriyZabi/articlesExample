const express = require('express')
const config = require('config')
const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
//app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
    origin: [config.get('baseUrl')],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
  })
)

const httpPort = config.get('httpPort') || 5000
const httpsPort = config.get('httpsPort') || 443

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.protocol === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`)
    }
    next()
  })
}

app.use(express.static('public'))
app.use('/api/sessions', require('./routes/sessions.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/articles', require('./routes/articles.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

let httpServer = http.createServer(app)
let httpsServer
if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/*****/privkey.pem',
    'utf8'
  )
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/*****/cert.pem',
    'utf8'
  )
  const ca = fs.readFileSync('/etc/letsencrypt/live/*****/chain.pem', 'utf8')
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  }
  httpsServer = https.createServer(credentials, app)
}
async function start() {
  try {
    httpServer.listen(httpPort, () => {
      console.log(`HTTP Server has been started on port ${httpPort} ...`)
    })

    if (httpsServer) {
      httpsServer.listen(httpsPort, () => {
        console.log(`HTTPS Server has been started on port ${httpsPort} ...`)
      })
    }
    return
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}
start()
