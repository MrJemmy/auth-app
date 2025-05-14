const Router = require("express").Router
const product = require("./controllers")
const { requireAuth } = require("../middlewares/auth")
const uploadImage = require("../middlewares/upload")

const routes = Router();


routes.route("/")
    .get(product.getAll)
    .post(requireAuth, uploadImage, product.createOne)  // user register
routes.route("/:productId")
    .get(product.getOne)
    .put(requireAuth, uploadImage, product.updateOne)
    .delete(requireAuth, product.deleteOne)


module.exports = routes