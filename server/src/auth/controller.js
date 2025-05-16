const callback = (req, res) => {

    const user = req.user

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    let username = user["username"];
    const tokenData = { id: user["_id"], username: username, roles: user["roles"] }
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
    // also need to set sameSite : 'None', otherwise frontend did not accepts refresh token as cookie
    // and then they say secure must be true
    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
    return res.json({
        "msg": "login succesfully",
        accessToken: accessToken,
        username: username
    })
};

module.exports = { callback }