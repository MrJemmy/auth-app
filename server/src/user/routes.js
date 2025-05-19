const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const user = require("./controllers")
const verifyRoles = require("../middleware/verifyRoles")
const { ROLES_LIST } = require("./const")
const { profilePic } = require("../config/multer_config")


const router = express.Router()

// route.use(authToken)  // this will apply auth on all below API

router.get('/', authToken, verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), user.getAll)
router.get('/:userId', authToken, user.getOne)
router.put('/:user_id', profilePic.single("image"), authToken, user.updateOne)
router.delete('/:user_id', authToken, user.deleteOne)


module.exports = router;