require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const errorHandler = require("./src/middleware/errorHandler")
const corsOptions = require("./src/config/corsConfig")
const credentials = require("./src/middleware/credentials")
const passport = require('passport');
const googleStrategy = require('./src/auth/strategies/google.strategy');
const facebookStrategy = require('./src/auth/strategies/facebook.strategy');

const app = express()

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParse())
// app.use(express.urlencoded({extended: false}))
app.disable("x-powered-by")


const directories = [
    path.join(__dirname, 'public', 'images', 'profilePics'),
    path.join(__dirname, 'public', 'images', 'uploads')
];

directories.forEach((dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});


googleStrategy(passport);
facebookStrategy(passport);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")))

app.use('/auth', require('./src/auth/routes'));
app.use('/user', require('./src/user/routes'))
app.use('/product', require('./src/product/routes'))

app.all("*", (req, res) => {
    res.status(404).json({
        error: "404 not found"
    });
})

app.use(errorHandler)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/`)
})