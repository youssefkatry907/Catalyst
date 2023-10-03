let jwt = require("jsonwebtoken")

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
                if (err) return res.status(403).json({ success: false, error: res.__("invalidToken"), code: 403 })
                if (!role.includes(tokenData.role)) return res.status(401).json({ success: false, error: res.__("unauthorized"), code: 401 })
                req.tokenData = tokenData;
                next();
            })

        } else return res.status(401).json({ success: false, error: res.__("unauthorized"), code: 401 })
    }

}