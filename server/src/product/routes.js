const Router = require("express").Router
const product = require("./controllers")
const { authToken } = require("../auth/middeware")
const { productPic } = require("../config/multerConfig")

const routes = Router();


routes.route("/")
    .get(product.getAll)
    .post(authToken, productPic.single("image"), product.createOne);  // user register
routes.route("/:productId")
    .get(product.getOne)
    .put(authToken, productPic.single("image"), product.updateOne)
    .delete(authToken, product.deleteOne)



module.exports = routes