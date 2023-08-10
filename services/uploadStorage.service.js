const path = require('path')
const multer = require('multer')
const config = require('config')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
    cb(null, true)
  },
})

const getFullFilePath = (fileName) => {
  const host =
    process.env.NODE_ENV === 'production'
      ? config.get('baseUrl')
      : `http://localhost:${config.get('httpPort')}`
  return `${host}/${config.get('uploadsFolder')}/${fileName}`
}

module.exports = { storage, upload, getFullFilePath }
