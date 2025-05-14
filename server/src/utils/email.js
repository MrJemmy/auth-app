const transporter = require("../config/emailConfig")



const sendEmail = async (reciver, subject, msg) => {

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: reciver,
        subject: subject,
        html: msg
    };

    await transporter.sendMail(emailOptions)
}

const genOTP = (size = 4) => {
    let OTP = ""

    for (let i = 1; i <= size; i++) {
        OTP += Math.floor(Math.random() * 10)
    }

    return OTP

}

module.exports = { sendEmail, genOTP }