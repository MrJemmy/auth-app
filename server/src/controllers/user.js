const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../config/email_config')
const { OTP_DATA } = require('../config/email_temps')
const { json } = require('express')
const e = require('express')

const otpStore = {}
const salt = bcrypt.genSaltSync(10)


/** POST: user/register
        * @param :  {
            "username": "",
            "password": "",
            "email": "",
            "firstname": "",
            "lastname": "",
            "mobile": "",
            "address": "",
            "profile": "",
        }
    */
const register = async (req, res) => {
    try {
        const startTime = new Date();
        const { username, password, email } = req.body;

        // Add Email Authentication Here.

        if (!username || !password || !email) return res.status(400).json({ msg: "Username, Password email are required." })

        // const { usernameExist, emailExist } = await Promise.all([
        //     // error handol here
        //     await User.exists({ username: username }),
        //     await User.exists({ email: email })
        // ])
        const usernameExist = await User.exists({ username: username });
        const emailExist = await User.exists({ email: email });

        if (usernameExist) {
            return res.json({
                "msg": "this username is allready exist"
            })
        }

        if (emailExist) {
            return res.json({
                "msg": "this email is allready exist"
            })
        }

        let profilePic = "";

        if (req.file && req.file.filename) {
            profilePic = req.file.filename;
        }

        const hashPassword = bcrypt.hashSync(password, salt)

        // if user is Admin and creating admin user, write condition for that
        await User.create({ username: username, password: hashPassword, email: email, profilePic: profilePic })


        const endTime = new Date();
        console.log('Time with Promise.all:', endTime - startTime, 'ms');
        return res.status(201).json({
            "msg": "user created succesfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ "msg": "error creating user" })
    }
}

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) return res.status(400).json({ msg: "Username or Email and Password are required." })

        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })

        if (!user) return res.status(401).json({ msg: "User not found" })

        const passOk = bcrypt.compareSync(password, user.password)

        if (!passOk) return res.status(500).json({ "msg": "login fail, password wrong" })

        let username = user["username"];
        const tokenData = { id: user["_id"], username: username, roles: user["roles"] }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
        // also need to set sameSite : 'None', otherwise frontend did not accepts refresh token as cookie
        // and then they say secure must be true
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.json({
            "msg": "login succesfully",
            accessToken: accessToken,
            username: username
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in user login"
        })
    }
}

const refreshToken = async (req, res) => {

    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(401).json({ msg: "Refresh Token Expired or not found" })

        const refreshToken = cookies.jwt;
        const refreshTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ _id: refreshTokenData["id"] })

        if (!user) return res.status(401).json({ msg: "User not found" })

        if (user.username !== refreshTokenData.username && user._id !== refreshTokenData.id) return res.status(403).json({ msg: "Refresh Token is invalid" })

        const tokenData = { id: user["_id"], username: user["username"], roles: user["roles"] }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
        return res.json({
            "msg": "login succesfully",
            accessToken: accessToken
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in user refresh token"
        })
    }

}

const generateOTP = async (req, res) => {

    try {
        const userEmail = req.body["email"]

        const user = await User.findOne({ email: userEmail })
        if (!user) return res.json({ msg: "User dose exis with this email address" })

        const subject = OTP_DATA["OTP_SUBJECT"];
        const htmlPre = OTP_DATA["OTP_HTML_PRE"];
        const htmlPost = OTP_DATA["OTP_HTML_POST"];

        const otp = Math.floor(Math.random() * 9000 + 1000);

        otpStore[userEmail] = { 
            otp: otp, 
            expires: Date.now() + 180000, 
            isVerified: false
        };

        const htmlFinal = `${htmlPre} ${otp} ${htmlPost}`

        sendEmail(userEmail, subject, htmlFinal)

        console.log(otpStore)
        return res.json({
            msg: "otp send to email"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in generating OTP"
        })
    }
}

const verifyOTP = async (req, res) => {

    try {
        const {email, otp} = req.body;

        if(!otpStore[email]) return res.json({msg: "email not found in otp store"});

        if(otpStore[email]["otp"] == otp && (Date.now() > otpStore[email]["expires"] )) {
            otpStore[email]["isVerified"] = true;
            return res.json({
                msg: "otp verified"
            })
        }else{
            return res.json({
                msg: "otp verification failed"
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in generating OTP"
        })
    }
}

const forgotPassword = async (req, res) => {

    try {
        // verify Email or Username
        const { email, newPassword } = req.body;
        
        if (!otpStore[email]) return res.json({msg: "email not found in otp store"})
        
        if(!otpStore[email]["isVerified"]) return res.json({msg: "otp is not verified"})

        delete otpStore[email];

        await User.updateOne({ email: email }, { password: newPassword })

        return res.json({
            msg: "password updated"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in Forgot Password"
        })
    }
}


const resetPassword = async (req, res) => {

    try {
        const { currentPassword, newPassword } = req.body;
        const username = req.user["username"];

        const user = await User.findOne({ username: username })

        // we also can verify the password is strong or not
        const passOk = bcrypt.compareSync(currentPassword, user.password)
        if (!passOk) return res.json({ msg: "password auth fail and please renter the password" })
        const isSamePass = bcrypt.compareSync(newPassword, user.password)
        if (isSamePass) return res.json({ msg: "new password is same as old password" })

        const hashPassword = bcrypt.hashSync(newPassword, salt)
        user.password = hashPassword;
        await user.save();

        return res.json({
            msg: "password updated succesfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in ResetPassword"
        })
    }



}

const logout = async (req, res) => {
    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(204).json({ msg: "Refresh Token not found" })
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        return res.json({
            msg: "user logged out successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in logout"
        })
    }
}

const getAll = async (req, res) => {

    try {
        const users = await User.find()

        return res.json({ "users": users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting users"
        })
    }
}

const getOne = async (req, res) => {
    // user can access it only if it's logged in user,
    try {
        const userId = req.params["userId"]

        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ "msg": "user not found" })

        // const {password, ...restUserData} = user;  // can not pass directly, give us unnecessary response
        const { password, ...restUserData } = Object.assign({}, user.toJSON());

        return res.json({ "user": restUserData })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting user"
        })
    }
}

const updateOne = async (req, res) => {
    try {
        const user_id = req.params["user_id"]; // 3
        const userBody = req.body;
        const user = await User.findOne({ _id: user_id });

        if (!user) return res.json({ msg: "this user is dose not exist" });


        // this is other way to perform profilePic
        // await User.updateOne({ _id: user_id}, userBody)
        if (userBody["username"]) {
            user["username"] = userBody["username"];
        }

        if (userBody["password"]) {
            user["password"] = userBody["password"];
        }

        if (userBody["email"]) {
            user["email"] = userBody["email"];
        }
        if (userBody["firstName"]) {
            user["firstName"] = userBody["firstName"];
        }

        if (userBody["lastName"]) {
            user["lastName"] = userBody["lastName"];
        }

        if (userBody["mobile"]) {
            user["mobile"] = userBody["mobile"];
        }

        if (userBody["address"]) {
            user["address"] = userBody["address"];
        }

        if (req.file && req.file.filename) {
            const oldFileName = user["profilePic"];

            if (oldFileName !== "") {
                const oldFilePath = path.join(
                    __dirname, "..", "..", "public", "images", "profilePics", oldFileName
                );
                fs.unlinkSync(oldFilePath);
            }

            user["profilePic"] = req.file.filename;
        }

        user.save();

        return res.status(202).json({
            msg: "user updated",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "internal server error",
            error: error,
        });

    }
};

const deleteOne = async (req, res) => {
    // User self, ADMIN
    try {
        const userId = req.params["user_id"]; // 3

        const singleUser = await User.exists({ _id: userId });

        if (!singleUser) {
            return res.json({
                msg: "this user is dose not exist",
            });
        } else {
            await User.deleteOne({ _id: userId });

            return res.status(202).json({
                msg: "user removed",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
            error: error,
        });
    }
};


module.exports = { register, login, forgotPassword, resetPassword, generateOTP, verifyOTP, logout, refreshToken, getAll, getOne, updateOne, deleteOne }