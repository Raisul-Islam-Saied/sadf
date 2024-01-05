const express = require("express");
const { login, logout, refreshTokenHandler, protectedRoute, profile } = require("../controllers/auth");
const { loginValidator } = require("../validators/auth");
const isLoggedOut = require("../middlewares/isLoggedOut");
const isLoggedIn = require("../middlewares/isLoggedIn");



const authRouter = express.Router();

//login 

authRouter.post('/login', loginValidator, login)
authRouter.delete('/logout', isLoggedIn, logout)
authRouter.get('/refresh_token', refreshTokenHandler)
authRouter.get('/protected_route', protectedRoute)
authRouter.get("/get_profile", isLoggedIn, profile)
module.exports = authRouter;
