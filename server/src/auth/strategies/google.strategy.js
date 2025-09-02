const { Strategy } = require('passport-google-oauth2');
const User = require("../../user/model")

const googleStrategy = (passport) => {
    passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        passReqToCallback: true,
    }, async (req, accessToken, refreshToken, profile, done) => {

        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const username = profile.email.split("@")[0]

                user = await User.create({
                    googleId: profile.id,
                    email: profile.email,
                    username: username,
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

module.exports = googleStrategy