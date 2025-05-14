const User = require('./model')



const getAll = async (req, res) => {

    try {
        const users = await User.find()

        return res.json({ "users": users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting users"
        })
    }
}

const getOne = async (req, res) => {
    // user can access it only if it's logged in user,
    try {
        const userId = req.params["userId"]

        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ "msg": "user not found" })

        // const {password, ...restUserData} = user;  // can not pass directly, give us unnecessary response
        const { password, ...restUserData } = Object.assign({}, user.toJSON());

        return res.json({ "user": restUserData })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting user"
        })
    }
}

const updateOne = async (req, res) => {

    let newFileName = ""

    try {
        const user_id = req.params["user_id"]; // 3
        const userBody = req.body;
        const user = await User.findOne({ _id: user_id });

        if (!user) return res.json({ msg: "this user is dose not exist" });


        // this is other way to perform profilePic
        // await User.updateOne({ _id: user_id}, userBody)
        if (userBody["username"]) {
            user["username"] = userBody["username"];
        }

        if (userBody["password"]) {
            user["password"] = userBody["password"];
        }

        if (userBody["email"]) {
            user["email"] = userBody["email"];
        }
        if (userBody["firstName"]) {
            user["firstName"] = userBody["firstName"];
        }

        if (userBody["lastName"]) {
            user["lastName"] = userBody["lastName"];
        }

        if (userBody["mobile"]) {
            user["mobile"] = userBody["mobile"];
        }

        if (userBody["address"]) {
            user["address"] = userBody["address"];
        }

        if (req.file?.filename) {
            newFileName = req.file.filename
            const oldFileName = user["profilePic"];

            if (oldFileName !== "") {
                const oldFilePath = path.join(
                    __dirname, "..", "..", "public", "images", "profilePics", oldFileName
                );
                fs.unlinkSync(oldFilePath);
            }

            user["profilePic"] = newFileName;
        }

        await user.save();

        return res.status(202).json({
            msg: "user updated",
        });

    } catch (error) {

        if (newFileName) {
            console.log("remove file name")
        }

        console.log(error);
        return res.status(500).json({
            msg: "internal server error",
            error: error,
        });

    }
};

const deleteOne = async (req, res) => {
    // User self, ADMIN
    try {
        const userId = req.params["user_id"];

        const singleUser = await User.exists({ _id: userId });

        if (!singleUser) return res.json({ msg: "user dose not exist" });

        await User.deleteOne({ _id: userId });

        return res.status(202).json({
            msg: "user removed",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
            error: error,
        });
    }
};

module.exports = { getAll, getOne, updateOne, deleteOne }