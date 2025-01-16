const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const { userRegister, userLogin, userForgotPassword, userResetPassword, generateOTP, userLogout, userRefreshToken, getUsers, getUser,  updateUser, deleteUser } = require("../controllers/user")
const verifyRoles = require("../middleware/verifyRoles")
const ROLES_LIST = require("../config/roles_list")


const route = express.Router()


// route.use(authToken)  // this will apply auth on all below API


route.get('/',authToken, verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), getUsers)
route.get('/:userId',authToken, getUser)
// route.put('/:user_id', verifyRoles(ROLES_LIST.admin, ROLES_LIST.user) updateUser)
// route.delete('/:user_id', deleteUser)
route.post('/register', userRegister)
// route.post('/register-main', mailRegister)
route.post('/login', userLogin)
route.post('/logout', userLogout);
// right know verifing OTP inside forgot password
route.post('/forgot_password', userForgotPassword);
// route.post('/verify_otp', verifyOtp);
route.post('/generate_otp', generateOTP);
route.post('/reset_password', authToken, userResetPassword);
route.post('/refresh', userRefreshToken);



module.exports = route;