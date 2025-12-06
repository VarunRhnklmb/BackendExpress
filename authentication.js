// authentication.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // 1. Check token exists or not in authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "No token provided",
            });
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];
        console.log(token);

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Store decoded data in request (id, email)
        req.user = decoded;

        // 5. Allow request to continue
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
