let jwt = require("jsonwebtoken")
require("dotenv").config();

exports.generateToken = (payload, expiresIn) => {
    expiresIn = expiresIn ? expiresIn : "365d"
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn })
}

exports.verifyToken = (role) => {
    return (req, res, next) => {
        let authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret", (err, tokenData) => {
                if (err) return res.status(403).json({ success: false, message: "Invalid token", code: 403 })
                if (!role.includes(tokenData.role)) return res.status(401).json({ success: false, message: "Unauthorized user", code: 401 })
                req.tokenData = tokenData;
                next();
            })

        } else return res.status(401).json({ success: false, message: "unauthorized", code: 401 })
    }

}