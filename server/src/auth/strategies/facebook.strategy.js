const { Strategy } = require('passport-facebook');
const User = require('../../user/user.model');

const facebookStrategy = (passport) => {
    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'email'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.id });

            if (!user) {
                user = await User.create({
                    facebookId: profile.id,
                    email: profile.emails?.[0]?.value || '',
                    username: profile.displayName,
                });
            }

            req.user = { _id: user["_id"], username: username, roles: user["roles"] }

            return done(null, user);

        } catch (error) {
            console.log(error)
            return done(error, null);
        }
    }));
};

module.exports = facebookStrategy