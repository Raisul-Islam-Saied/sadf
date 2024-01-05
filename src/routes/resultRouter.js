const express = require("express");
const runValidators = require("../validators");
const { addResultValidator, publishedResultValidation, getResultsValidation, getResultValidation } = require("../validators/resultValidator");
const { createResult, getResult, publishResult, getAllresultAdmin, getAllresultUser, deleteResult, getUnpublishResults } = require("../controllers/resultController");
const isTeacherOrAdmin = require("../middlewares/isTeacherOrAdmin");
const isAdmin = require("../middlewares/isAdmin");

const resultRouter = express.Router();

//add user 
resultRouter.post("/add_result", isTeacherOrAdmin, addResultValidator, runValidators, createResult);
resultRouter.post("/get_result", getResultValidation, runValidators, getResult);
resultRouter.put('/publish_results', isAdmin, publishedResultValidation, runValidators, publishResult)
resultRouter.get('/get_all_result', isTeacherOrAdmin, getAllresultAdmin)
resultRouter.post('/get_results', getResultsValidation, runValidators, getAllresultUser)
resultRouter.delete('/delete_result/:id', isTeacherOrAdmin, deleteResult)
resultRouter.get("/get_unpublish_results", isAdmin, getUnpublishResults)
module.exports = resultRouter;
