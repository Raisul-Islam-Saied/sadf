const mongoose = require('mongoose');
const { nameOfClass, } = require('./data.json')


const syllabusSchema = new mongoose.Schema({


    exam_year: {
        type: Number,
        required: true,

    },

    nameOfClass: {
        type: String,
        required: [true, "Class name is a required field"],
        minlength: [2, "Class name must be at least 2 characters long"],
        maxlength: [30, "Class name can be maximum 30 characters"],
        enum: nameOfClass,
        trim: true
    },
    totoalDownload: {
        type: Number,
        default: 0,
    },
    syllabus: {
        type: String,
        required: true
    }




}, { timestamps: true });

const Syllabus = mongoose.model('Syllabus', syllabusSchema);


module.exports = Syllabus;
