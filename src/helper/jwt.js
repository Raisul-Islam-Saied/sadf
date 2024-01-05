const jwt = require('jsonwebtoken')
const jwtToken = (payload, secret, exparies) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: exparies
    })
    return token
}
module.exports = jwtToken