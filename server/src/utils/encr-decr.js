const crypto = require("crypto");

const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;
const ENCRYPTION_SECRET_IV = process.env.ENCRYPTION_SECRET_IV;
const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD;

// Generate secret hash with crypto to use for encryption
const encryptionKey = crypto
    .createHash('sha512')
    .update(ENCRYPTION_SECRET_KEY)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(ENCRYPTION_SECRET_IV)
    .digest('hex')
    .substring(0, 16)

// Encrypt data
function encrypt(data) {
    const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, encryptionKey, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
function decrypt(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, encryptionKey, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) // Decrypts data and converts to utf8
}


module.exports = { encrypt, decrypt };