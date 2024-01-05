const createError = require('http-errors')
const jwt = require("jsonwebtoken");
const { jwt_refresh_key, jwt_access_key } = require('../config/config');
const People = require('../models/userModel');
const isTeacherOrAdmin = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;
        if (!access_token) {
            throw createError(404, "unothorize")
        }
        const decoded = jwt.decode(access_token, jwt_access_key)
        if (!decoded) {
            throw createError(400, "invalid token")
        }
        const user = await People.findOne({ _id: decoded._id })
        if (user.role === "admin" || user.role === "teacher") {
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

module.exports = isTeacherOrAdmin