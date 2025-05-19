const fs = require("fs")
const path = require("path")

const OTP_EMAIL = {
    subject: "Your OTP Code for Verification is ...",
    htmlPre: fs.readFileSync(path.join(__dirname, "..", "..", "public", "emailFormate", "htmlPre.txt")),
    htmlPost: fs.readFileSync(path.join(__dirname, "..", "..", "public", "emailFormate", "htmlPost.txt"))
}

module.exports = { OTP_EMAIL }