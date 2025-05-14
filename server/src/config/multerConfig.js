const multer = require('multer')
const path = require('path')

// create multiple storege and multerConfig for diffrent file Uploads
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "public", "images", "profilePics"));
    },
    filename: (req, file, cb) => {
        const preFix = Date.now() + '-' + Math.round(Math.random() * 100000)
        cb(null, preFix + '-' + file.originalname)
    }
})


const profilePic = multer({ storage: profileStorage })

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "public", "images", "productPics"));
    },
    filename: (req, file, cb) => {
        const preFix = Date.now() + '-' + Math.round(Math.random() * 100000)
        cb(null, preFix + '-' + file.originalname)
    }
})


const productPic = multer({ storage: productStorage })

module.exports = { profilePic, productPic }