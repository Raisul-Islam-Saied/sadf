const createError = require("http-errors");
const Otp = require("../models/otp");
const People = require("../models/userModel");
const { successMessage } = require("../helper/successMessage");
const bcrypt = require('bcryptjs')
const { email_unverified_code, jwtSectetKey, jwt_access_key, client_url } = require("../config/config");
const jwt = require("jsonwebtoken");
const otpTemplate = require("../helper/mailgenOtp");
const mailWithNodemailer = require("../helper/email");

const addUser = async (req, res, next) => {
    try {
        const { name, email, phone, password, confirm_password, address, gender } = req.body;
        if (!password === confirm_password) { throw createError(400, 'password and confirm password not mached') }
        const avatar = req.files && req.files.length > 0 ? req.files[0].buffer.toString('base64') : null
        const isPhoneVerified = await Otp.findOne({ $and: [{ method: phone }, { verified: true }] }, { new: true })

        if (!isPhoneVerified) {
            throw createError(401, 'please verify your phone before register')
        }


        const userdata = {
            name,
            email: email + email_unverified_code,
            phone,
            password,
            confirm_password,
            address,
            gender,
            avatar
        }
        const user = await People.create(userdata)
        if (user) {
            successMessage(res, 201, 'successfully registered', { name, email, phone, address, gender })
        } else {
            throw createError(400, 'failed to registerd')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}
//get single user by id
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await People.findById(id).select('-password')
        if (!user) {
            throw createError(404, 'user not found')
        }
        successMessage(res, 200, 'success', { user })
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}

//get all user by 
const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRgeExp = new RegExp(".*" + escapedSearch + ".*", "i");


        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: searchRgeExp },
                { email: searchRgeExp },
                { phone: searchRgeExp },
            ]
        }
        const options = {
            password: 0
        }

        const users = await People.find(filter, options).skip(page - 1).limit(limit).sort({ name: 'descending' })

        if (Object.keys(users).length >= 1) {
            const count = await People.find(filter).countDocuments();
            successMessage(res, 200, "success", {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            });
        } else {
            throw createError(404, "users not found");
        }
    } catch (error) {
        next({
            common: {
                msg: error
            }
        })
    }
}
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, address, } = req.body
        const user = await People.findOne({ _id: id })

        if (!user) {
            throw createError(404, 'we did not found user with this information')
        }
        const updates = {
            name: name ? name : user.name,
            address: address ? address : user.address,
            avatar: req.files && req.files.length > 0 ? req.files[0].buffer.toString('base64') : user.avatar
        }
        const updateOptions = {
            new: true,
            runValidators: true,
            context: "query",
        };
        const updatedUser = await People.findByIdAndUpdate(id, updates, updateOptions).select('-password')
        if (!updatedUser) {
            throw createError(400, 'failed to update information')
        }
        successMessage(res, 200, 'updated successfully', { updatedUser })
    } catch (error) {
        next({
            common:
            {
                msg: error.message
            }
        })
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const token = req.cookes.accessToken
        const id = req.params.id
        const decoded = jwt.verify(token, jwt_access_key)

        //delete by admin
        if (decoded.isAdmin) {
            const user = await People.findByIdAndDelete({ _id: id }).select('-password')
            if (user) {
                successMessage(res, 200, 'successfully deleted', { user })
            } else {
                throw createError(400, 'failed to delete account')
            }
        }

        //delete by user
        else {
            const user = await People.findOne({ _id: id })
            if (user) {
                const password = bcrypt.compareSync(password, user.password)
                if (!password) {
                    throw createError(400, 'you have entered wrong password')
                }
                await user.deleteOne({ new: true })
            } else {
                throw createError(404, 'failed to update! user not found')
            }


        }
    } catch (error) {

    }
}
//ban user by id , just admin can do this
const banUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = { isBanned: true };
        const updateOptions = { new: true, runValidators: true };
        const user = await People.findByIdAndUpdate(userId, updates, updateOptions);
        if (user) {
            successMessage(res, 200, "success");
        } else {
            throw createError(400, "failed to updata");
        }
    } catch (error) {
        next({
            common: {
                msg: error.message,
            },
        });
    }
};
//unban user by id , just admin can do this
const unbanUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = { isBanned: false };
        const updateOptions = { new: true, runValidators: true };
        const user = await People.findByIdAndUpdate(userId, updates, updateOptions);
        if (user) {
            successMessage(res, 200, "success");
        } else {
            throw createError(400, "failed to updata");
        }
    } catch (error) {
        next({
            common: {
                msg: error.message,
            },
        });
    }
};

//update password
const updatePassword = async (req, res, next) => {
    try {
        //old password has been checked in validator , if old password invalid user cannot reach here and new_password and confirm_password also
        const { id, confirm_password } = req.body

        const user = await People.findByIdAndUpdate(id, { password: bcrypt.hashSync(confirm_password, bcrypt.genSaltSync(10)) }, { runValidators: true, }).select('-password')
        if (!user) {
            throw createError(400, 'failed to update password')
        }
        successMessage(res, 200, 'successfully updated', user)

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}

const resetPasswordRequset = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await People.findOne({ email: email }).select("-password")
        if (!user) {
            throw createError(404, 'not found user with this email')
        }
        const token = jwt.sign({ id: user._id }, jwtSectetKey, {
            expiresIn: '5m'
        })
        const mailData = {
            email: email,
            subject: 'reset password',
            html: otpTemplate('', 'reset password', `${client_url}/reset_password?token=${token}`)
        }
        await mailWithNodemailer(mailData)
        successMessage(res, 200, 'request accepted , an email send to your email')
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }


}

const resetPassword = async (req, res, next) => {
    try {
        const { token, confirm_password } = req.body
        const decoded = jwt.verify(token, jwtSectetKey)
        if (!decoded) {
            throw createError(400, 'invalid token')
        }
        const id = decoded.id
        const user = await People.findByIdAndUpdate(id, { password: bcrypt.hashSync(confirm_password, bcrypt.genSaltSync(10)) })
        if (!user) {
            throw createError(400, 'failed to reset password')
        }
        successMessage(res, 200, 'password reset successfully')
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next({
                common: {
                    msg: 'token expired , please verify again'
                }
            })
        }
        next({
            common: {
                msg: error.message
            }
        })

    }


}


module.exports = { addUser, updateUser, deleteUser, getUser, getUsers, banUserById, unbanUserById, updatePassword, resetPasswordRequset, resetPassword }