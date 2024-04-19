const createError = require('http-errors')
const Routine = require('../models/routine')
const { successMessage } = require('../helper/successMessage')
const Teacher = require('../models/teacher')
const modifyRoutine = require('../helper/modifyRoutine')
const isTeacherOrAdmin = require('../middlewares/isTeacherOrAdmin')

const createRoutine = async (req, res, next) => {
    try {
       
        const { subject, nameOfClass, priority, from, to, day, teacher, teacher_id, sakha, } = req.body




        await Routine.deleteOne({ day, nameOfClass, sakha, priority })

        const isTeacherExist = await Teacher.exists({ teacher_id })
        if (!isTeacherExist) {
            throw createError(400, 'invalid teacher name')
        }



        const routine = await Routine.create({ subject, nameOfClass, priority, from, to, day, teacher, teacher_id, sakha, })
        if (!routine) {
            throw createError(400, 'failed to create routine')
        }
        successMessage(res, 201, 'successfully added', routine,)

    } catch (error) {
        console.log(error);
        next({
            common: {
                msg: error.message
            }
        })
    }
}

const getRoutine = async (req, res, next) => {
    try {
        const { nameOfClass, sakha } = req.query;

        const routine = await Routine.find({ sakha, nameOfClass })

        // if (!routine.length > 0 ) {
        //     throw createError(404, "routine not found")
        // }

        const modifiedRoutine = modifyRoutine(routine)
        const routineInfo = {
            nameOfClass, sakha
        }

        successMessage(res, 200, "", { routine: modifiedRoutine, info: routineInfo })


console.log(routine);

    } catch (error) {
        console.log(error);
        next({
            common: {
                msg: error.message
            }
        })
    }
}


const updateRoutine = async (req, res, next) => {
    try {
        const { id } = req.params
        const { subject, nameOfClass, priority, time, day, teacher, sakha } = req.body



        const ispriorityMatched = await Routine.findOne({
            $and: [
                { nameOfClass }, { sakha }, { day }, { priority }
            ]
        })
        console.log(ispriorityMatched);

        if (ispriorityMatched && !ispriorityMatched._id === id) {
            throw createError(400, 'priority is matched with another subject , please select another')
        }
        const routine = await Routine.findByIdAndUpdate(id, { subject, nameOfClass, priority, time, day, teacher, sakha }, { new: true, runValidators: true, context: 'query' })
        if (!routine) {
            throw createError(400, 'failed to update routine')
        }
        successMessage(res, 201, 'successfully updated', { routine })

    } catch (error) {
        next({
            commn: {
                msg: error.message
            }
        })
    }
}
const deleteRoutine = async (req, res, next) => {
    try {

        const { id } = req.params
        console.log(id);



        const routine = await Routine.findOneAndDelete({ _id: id })
        if (routine) {
            successMessage(res, 200, 'successfully deleted', routine)
        } else {
            throw createError(400, 'failed to delete')
        }

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}
module.exports = { createRoutine, getRoutine, updateRoutine, deleteRoutine }