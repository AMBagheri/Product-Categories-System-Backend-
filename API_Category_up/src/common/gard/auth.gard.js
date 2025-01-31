const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const {Message} = require("../../common/messages/product.message");

const roleGuard = (requiredRole) => (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new createHttpError(401, Message.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ["HS256"] });


        if (!decodedToken || decodedToken.role !== requiredRole) {
            throw new createHttpError(403, Message.FORBIDDEN);
        }

        req.user = decodedToken;
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = roleGuard;