const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format!" });
    }
    token = tokenParts[1];
    
    return jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        } else {
            return decoded.id;
        }
    });
}