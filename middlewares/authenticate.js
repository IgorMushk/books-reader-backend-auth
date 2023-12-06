const {HttpError} = require("../helpers");
const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" ) {
        console.log('No token!');
        next(HttpError(401));
        return; // !!!!!if not return - ERROR in console
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }
        req.user = user;
        next()
    } catch  {
        //console.log("CATCH");
        next(HttpError(401));
    }
}

module.exports = authenticate;