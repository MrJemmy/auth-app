const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const user = require("./controllers")
const verifyRoles = require("../middleware/verifyRoles")
const { ROLES_LIST } = require("./const")
const { profilePic } = require("../config/multer_config")


const route = express.Router()

// route.use(authToken)  // this will apply auth on all below API


route.post('/register', profilePic.single("image"), user.register)
route.post('/login', user.login)
route.post('/refresh', user.refreshToken);
route.post('/generate_otp', user.generateOTP);
route.post('/verify_otp', user.verifyOTP);
route.post('/forgot_password', user.forgotPassword);
route.post('/reset_password', authToken, user.resetPassword);
route.post('/logout', user.logout);

route.get('/', authToken, verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), user.getAll)

route.get('/:userId', authToken, user.getOne)
route.put('/:user_id', authToken, user.updateOne)
route.delete('/:user_id', authToken, user.deleteOne)


module.exports = route;