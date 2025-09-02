const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const user = require("./controllers")
const userAuth = require("./auth")
const verifyRoles = require("../middleware/verifyRoles")
const { ROLES_LIST } = require("./const")
const { profilePic } = require("../config/multer_config")


const route = express.Router()

// route.use(authToken)  // this will apply auth on all below API




route.get('/', authToken, verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), user.getAll)
route.get('/:userId', authToken, user.getOne)
route.put('/:user_id', authToken, profilePic.single("image"), user.updateOne)
route.delete('/:user_id', authToken, user.deleteOne)


module.exports = route;