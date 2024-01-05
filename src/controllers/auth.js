const createError = require("http-errors")
const People = require("../models/userModel")
const { successMessage } = require("../helper/successMessage")
const bcrypt = require('bcryptjs')
const { setAccessTokenCookie, setRefreshTokenCookie } = require("../helper/cookie")
const jwt = require("jsonwebtoken");
const { jwt_access_key, jwt_refresh_key } = require("../config/config");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await People.findOne({ email: email })


        if (user && bcrypt.compareSync(password, user.password)) {
            if (user.isBanned) {
                throw createError(400, "your account is disabled , please contact with autority")
            }


            const accessToken = jwt.sign({ _id: user._id, email: user.email }, jwt_access_key, {
                expiresIn: "1m"
            })

            const refreshToken = jwt.sign
                ({ _id: user._id, email: user.email }, jwt_refresh_key, { expiresIn: '30d' })

            setAccessTokenCookie(res, accessToken)
            setRefreshTokenCookie(res, refreshToken)

            successMessage(res, 200, 'successfully loggedin')

        } else {
            throw createError(400, 'wrong email or password')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}

const logout = (req, res, next) => {
    try {
        if (req.cookies.access_token || req.cookies.refresh_token) {
            res.clearCookie('access_token')
            res.clearCookie('refresh_token')
            successMessage(res, 200, 'successfully logged out')
        } else {
            throw createError(400, 'you are already logged out')
        }

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}

const refreshTokenHandler = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refresh_token;

        if (oldRefreshToken) {
            const decoded = jwt.verify(oldRefreshToken, jwt_refresh_key);
            console.log(decoded);
            if (decoded) {
                const user = await People.exists({ email: decoded.email, _id: decoded._id })
                if (!user) {
                    throw createError(404, "not Found");
                }
                if (user.isBanned) {
                    throw createError(400, "your account has been banned");
                }

                const token = jwt.sign({ _id: decoded._id, email: decoded.email }
                    , jwt_access_key, { expiresIn: "1m" });

                setAccessTokenCookie(res, token);
                successMessage(res, 201, 'accesstoken genaterated successfully', token)

            } else {
                throw createError(400, "invalid or expired token");
            }
        } else {
            throw createError(400, "token not found , please login agin");
        }
    } catch (error) {
        next({
            common: {
                msg: error
            }
        })
    }
};

const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;

        if (accessToken) {
            const decoded = jwt.verify(accessToken, jwt_access_key);
            if (decoded) {
                const user = await People.exists({ email: decoded.email, _id: decoded._id })
                if (!user) {
                    throw createError(404, "not Found");
                }
                if (user.isBanned) {
                    throw createError(400, "your account has been banned");
                }
                successMessage(res, 200, 'protected resurces accessed successfully')
            } else {
                throw createError(400, "invalid or expired token");
            }
        } else {
            throw createError(400, "token not found , please login agin");
        }
    } catch (error) {
        next(error);
    }
};
const profile = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;
        if (!access_token) {
            throw createError(401, "unothorize");
        }
        const decoded = jwt.verify(access_token, jwt_access_key);
        if (!decoded) {
            throw createError(401, "unothorize");
        }
        const user = await People.findOne({ email: decoded.email, _id: decoded._id }).select(
            "-password"
        );
        if (!user) {
            throw createError(404, "not Found");
        }
        if (user.isBanned) {
            throw createError(400, "your account has been banned");
        }
        successMessage(res, 200, "success", user);
    } catch (error) {
        next({
            common: {
                msg: error.message,
            },
        });
    }
};
module.exports = { login, logout, refreshTokenHandler, protectedRoute, profile }