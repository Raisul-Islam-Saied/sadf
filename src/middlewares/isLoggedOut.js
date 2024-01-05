const createError = require('http-errors')

const isLoggedOut = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        if (!refresh_token) {
            next()
        }

        else {
            throw createError(400, 'you are already logged in')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}

module.exports = isLoggedOut