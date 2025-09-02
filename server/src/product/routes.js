const Router = require("express").Router
const product = require("./controllers")
const { requireAuth } = require("../middlewares/auth")
const { productPic } = require("../config/multerConfig")

const routes = Router();


routes.route("/")
    .get(product.getAll)
    .post(requireAuth, productPic.single("image"), product.createOne)  // user register
routes.route("/:productId")
    .get(product.getOne)
    .put(requireAuth, productPic.single("image"), product.updateOne)
    .delete(requireAuth, product.deleteOne)


module.exports = routes