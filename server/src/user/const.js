const fs = require("fs")
const path = require("path")

const ROLES_LIST = {
    "admin": 7563,
    "user": 8419,
    "editor": 6248
}

const GENDERS = {
    MALE: 1,
    FEMALE: 2,
    OTHERS: 3
}

const OTP_EMAIL = {
    subject: "Your OTP Code for Verification is ...",
    htmlPre: fs.readFileSync(path.join(__dirname, "..", "..", "public", "emailFormate", "htmlPre.txt")),
    htmlPost: fs.readFileSync(path.join(__dirname, "..", "..", "public", "emailFormate", "htmlPost.txt"))
}

module.exports = { GENDERS, OTP_EMAIL, ROLES_LIST }