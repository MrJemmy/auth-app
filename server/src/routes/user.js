const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const { userRegister, userLogin, userForgotPassword, userResetPassword, generateOTP, userLogout, userRefreshToken, getUsers, getUser,  updateUser, deleteUser } = require("../controllers/user")
const verifyRoles = require("../middleware/verifyRoles")
const ROLES_LIST = require("../config/roles_list")


const route = express.Router()


// route.use(authToken)  // this will apply auth on all below API


route.post('/register', userRegister)
route.post('/login', userLogin)
route.post('/refresh', userRefreshToken);
route.post('/generate_otp', generateOTP);
route.post('/verify_otp', verifyOtp);
route.post('/forgot_password', userForgotPassword);
route.post('/reset_password', authToken, userResetPassword);
route.post('/logout', userLogout);

route.get('/',authToken, verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), getUsers)

route.get('/:userId',authToken, getUser)
route.put('/:user_id',authToken, updateUser)
route.delete('/:user_id',authToken, deleteUser)

// route.post('/register_main', mailRegister)
// route.post('/verify_otp', verifyOtp);


module.exports = route;