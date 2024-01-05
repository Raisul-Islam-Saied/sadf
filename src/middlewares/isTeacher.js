const createError  = require('http-errors')
const jwt = require("jsonwebtoken");
const { jwt_refresh_key } = require('../config/config');
const People = require('../models/userModel');
const isTeacher = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;
        if (!access_token) {
            throw createError(404, "unothorize")
        }
        const decoded = jwt.decode(access_token, jwt_refresh_key)
        if (!decoded) {
            throw createError(400, "invalid token")
        }
        const user = await People.findOne({ _id: decoded._id })
        if (user.role === "teacher") {
            next()
        } else {
            throw createError(400, 'unothorize')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}

module.exports = isTeacher