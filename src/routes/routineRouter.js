const express = require("express");
const { addRotineValidation } = require("../validators/routine");
const { createRoutine, getRoutine, deleteRoutine } = require("../controllers/routineController");
const runValidators = require("../validators");
const isTeacherOrAdmin = require("../middlewares/isTeacherOrAdmin");

const routineRouter = express.Router();

routineRouter.post("/add_routine", addRotineValidation, runValidators, createRoutine);
routineRouter.get('/get_routine', runValidators, getRoutine)


routineRouter.delete('/delete_routine/:id', deleteRoutine)

module.exports = routineRouter;
