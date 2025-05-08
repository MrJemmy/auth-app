const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    }
)


const sendEmail = (to, subject, html) => {

    try {
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: subject,
            html: html
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { sendEmail }
