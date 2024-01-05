const express = require("express");

const runValidators = require("../validators");
const { addUser, updateUser, deleteUser, banUserById, unbanUserById, updatePassword, resetPasswordRequset, resetPassword, getUser, getUsers } = require("../controllers/userController");
const avatarUploader = require("../helper/avatarUploader");
const { addUserValidators, updataUserValidators, updatePasswordValidators, resetPasswordRequestValidation, resetPasswordValidators } = require("../validators/userValidation");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const userRouter = express.Router();

//add user 
userRouter.post("/registration", avatarUploader, addUserValidators, runValidators, addUser);

userRouter.get('/:id', isLoggedIn, getUser)
userRouter.get('/', isAdmin, getUsers)

//update user with id , it's just update name , address , avatar (add > is loggedin)
userRouter.put("/update/:id",  avatarUploader, updataUserValidators, runValidators, updateUser);

//delete user by id (add > isLoggedin)
userRouter.delete("/delete/:id", isLoggedIn, deleteUser);

//update password (add > isLoggedin)
userRouter.put('/update_password', isLoggedIn, updatePasswordValidators, runValidators, updatePassword)

//ban user by id (only admin can do this)
userRouter.put('/ban_user/:id', banUserById)


//unban user by id (only admin can do this)
userRouter.put('/unban_user/:id', unbanUserById)

//reset password request 
userRouter.post('/reset_password_request', resetPasswordRequestValidation, runValidators, resetPasswordRequset)
userRouter.put('/reset_password', resetPasswordValidators, runValidators, resetPassword)
module.exports = userRouter;
