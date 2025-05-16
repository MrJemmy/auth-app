const express = require('express');
const passport = require('passport');
const { callback } = require('./controller');

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    callback
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), callback);

module.exports = router;
