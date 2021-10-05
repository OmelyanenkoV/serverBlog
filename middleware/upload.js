const path = require('path')
const multer= require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination (req, file, callback) {
        callback(null, path.resolve(__dirname, '../static'))
    },
    filename (req, file, callback) {
        callback(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
    }
})
const fileFIter = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}



module.exports = multer({
    storage, fileFIter, limits: {fileSize: 1024 * 1024 * 5}
})
