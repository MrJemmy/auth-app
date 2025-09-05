const express = require('express');
const passport = require('passport');
const auth = require('./controller');
const { authToken } = require("./middeware")
const { profilePic } = require("../config/multerConfig")

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), auth.callback);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), auth.callback);


router.post('/register', profilePic.single("image"), auth.register)
router.post('/verify_user', auth.verifyUser)
router.post('/login', auth.login)
router.post('/refresh', auth.refreshToken);
router.post('/generate_otp', auth.generateOTP);
router.post('/verify_otp', auth.verifyOTP);
router.post('/forgot_password', auth.forgotPassword);
router.post('/reset_password', authToken, auth.resetPassword);
router.post('/logout', auth.logout);

module.exports = router;
