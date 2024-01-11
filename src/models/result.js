const mongoose = require('mongoose');
const { nameOfClass, sakha, exam_name, group, gender } = require('./data.json')
const resultSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        maxlength: [100, 'Subject can have a maximum length of 100 characters']
    },
    marks: {
        type: Number,
        required: [true, 'Marks are required'],
        min: [0, 'Marks cannot be negative'],
        max: [100, 'Marks cannot exceed 100']
    },
    grade: {
        type: String,
        required: [true, 'Grade is required'],
        maxlength: [2, 'Grade can have a maximum length of 2 characters']
    },
    point: {
        type: Number,
        required: [true, 'Grade points are required'],
        min: [0, 'Grade points cannot be negative']
    }
});

const studentSchema = new mongoose.Schema({

    student_id: {
        type: String,
        required: [true, 'Student ID is required'],
        maxlength: [10, 'Student ID can have a maximum length of 10 characters']

    },
    name: {
        type: String,
        required: [true, "Name is a required field"],
    },
    name_bangla: {
        type: String,
        required: [true, "Bangla name is a required field"],

    },



    father_name_bangla: {
        type: String,
        required: [true, "Father's Bangla name is a required field"],
        minlength: [3, "Father's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Father's Bangla name can be maximum 30 characters"],
        trim: true
    },



    mother_name_bangla: {
        type: String,
        required: [true, "Mother's Bangla name is a required field"],
        minlength: [3, "Mother's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Mother's Bangla name can be maximum 30 characters"],
        trim: true
    },



    date_of_birth: {
        type: Date,
        required: [true, "Date of birth is a required field"]
    },
    gender: {
        type: String,
        enum: gender,
        required: [true, "Gender is a required field"]
    },
    group: {
        type: String,
        required: [true, "Class category is a required field"],
        enum: group,

    },

    exam_name: {
        type: String,
        require: true,
        enum: exam_name
    },
    exam_year: {
        type: Number,
        required: true,

    },
    total_examinee: {
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

    sakha: {
        type: String,
        required: [true, "Sakha is a required field"],
        enum: sakha,
        trim: true
    },
    roll: {
        type: Number,
        required: [true, "Roll is a required field"],
        minlength: [1, "Roll must be at least 1 character long"],
        maxlength: [1000, "Roll can be maximum 1000 characters"],
        trim: true
    },
    subjects: [resultSchema],
    total_marks: {
        type: Number,
        required: [true, 'Marks are required'],
        min: [0, 'Marks cannot be negative'],

    },
    best_marks: {
        type: Number,
        required: true,
        default: 0

    },
    avarage_marks: {
        type: Number,
        required: true,

    },
    avarage_grade: {
        type: String,
        required: [true, 'Grade is required'],
        maxlength: [2, 'Grade can have a maximum length of 2 characters']
    },
    avarage_point: {
        type: Number,
        required: [true, 'Grade points are required'],
        min: [0, 'Grade points cannot be negative']
    },
    grade: {
        type: String,
        required: [true, 'Grade is required'],
        maxlength: [22, 'Grade can have a maximum length of 2 characters']
    },
    gpa: {
        type: Number,
        required: [true, 'Grade points are required'],
        min: [0, 'Grade points cannot be negative']
    },
    position: {
        type: Number,
        required: true,
        minlength: 0,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Passed', 'Failed']
    },
    published: {
        type: Boolean,
        default: false
    },
    avatar: {
        required: false,
        default: null,
        type: String,
    }

}, { timestamps: true });

const Result = mongoose.model('Result', studentSchema);


module.exports = Result;
