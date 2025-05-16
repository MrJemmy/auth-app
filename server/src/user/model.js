const mongoose = require('mongoose')
const { GENDERS, ROLES_LIST } = require("./const")


const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default: ""
    },
    facebookId: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: [true, "Email Exist"],
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    DOB: {
        type: Date,
        default: null
    },
    gender: {
        type: Number,
        enum: [GENDERS.MALE, GENDERS.FEMALE, GENDERS.OTHERS]
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: {
            type: String,
            default: "india"
        },
        code: Number
    },
    profilePic: {
        type: String,
        default: ''
    },
    roles: {
        type: [Number],
        enum: [ROLES_LIST.admin, ROLES_LIST.editor, ROLES_LIST.user],
        default: [ROLES_LIST.user]
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: true,
    versionKey: false
})


userSchema.virtual('id').get(function () {
    return this._id.toString(); // or this._id.valueOf() for a number
});
      
const User = mongoose.model('User', userSchema)

module.exports = User