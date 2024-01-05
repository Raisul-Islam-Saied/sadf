const mongoose = require('mongoose');
const { blood_group, religion, gender } = require('./data.json')
const teacherSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true,
        length: 8
    },
    birth_no: {
        type: String,
        required: true,
        length: 17
    },
    nid_no: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: [true, "Name is a required field"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [30, "Name can be maximum 30 characters"],
        trim: true
    },

    name_bangla: {
        type: String,
        required: [true, "Bangla name is a required field"],
        minlength: [3, "Bangla name must be at least 3 characters long"],
        maxlength: [30, "Bangla name can be maximum 30 characters"],
        trim: true
    },

    father_name: {
        type: String,
        required: [true, "Father's name is a required field"],
        minlength: [3, "Father's name must be at least 3 characters long"],
        maxlength: [30, "Father's name can be maximum 30 characters"],
        trim: true
    },

    father_name_bangla: {
        type: String,
        required: [true, "Father's Bangla name is a required field"],
        minlength: [3, "Father's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Father's Bangla name can be maximum 30 characters"],
        trim: true
    },

    mother_name: {
        type: String,
        required: [true, "Mother's name is a required field"],
        minlength: [3, "Mother's name must be at least 3 characters long"],
        maxlength: [30, "Mother's name can be maximum 30 characters"],
        trim: true
    },

    mother_name_bangla: {
        type: String,
        required: [true, "Mother's Bangla name is a required field"],
        minlength: [3, "Mother's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Mother's Bangla name can be maximum 30 characters"],
        trim: true
    },

    email: {
        type: String,
        default: null,
        validate: {
            validator: (email) => {
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                }
            },
            message: 'Invalid email format'
        }
    },

    date_of_birth: {
        type: Date,
        required: [true, "Date of birth is a required field"]
    },


    religion: {
        type: String,
        required: [true, "Religion is a required field"],
        type: String,
        enum: religion,
        required: [true, "Religion is a required field"],
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone is a required field"],
        minlength: [10, "Phone must be at least 10 characters long"],
        maxlength: [15, "Phone can be maximum 15 characters"],
        trim: true
    },

    address: {
        type: String,
        required: [true, "Address is a required field"],
        minlength: [5, "Address must be at least 5 characters long"],
        maxlength: [200, "Address can be maximum 200 characters"],
        trim: true
    },

    gender: {
        type: String,
        enum: gender,
        required: [true, "Gender is a required field"]
    },
    date_of_join: {
        type: Date,
        required: [true, "Date of admission is a required field"]
    },
    education_institute_name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name can be maximum 50 characters"],
    },
    blood_group: {
        type: String,
        enum: blood_group,
        required: [true, "Blood group is a required field"]
    },
    avatar: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
