const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user?.roles) return res.status(401).json({ msg: "Unauthorized User" })
        const result = req.user.roles.map(role => allowedRoles.includes(role)).some(val => val === true)
        if(!result) return res.status(401).json({ msg: "Unauthorized User"})
        next()
    }
}

module.exports = verifyRoles;