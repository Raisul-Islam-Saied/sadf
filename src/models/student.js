// const mongoose = require('mongoose');
// const { nameOfClass, sakha, religion, gender, group, blood_group } = require('./data.json')
// const studentSchema = new mongoose.Schema({
//     student_id: {
//         type: String,
//         required: true,
//         length: 10
//     },
//     birth_no: {
//         type: String,
//         required: true,

//     },
//     name: {
//         type: String,
//         required: [true, "Name is a required field"],
//         minlength: [3, "Name must be at least 3 characters long"],
//         maxlength: [30, "Name can be maximum 30 characters"],
//         trim: true
//     },

//     name_bangla: {
//         type: String,
//         required: [true, "Bangla name is a required field"],
//         minlength: [3, "Bangla name must be at least 3 characters long"],
//         maxlength: [30, "Bangla name can be maximum 30 characters"],
//         trim: true
//     },

//     father_name: {
//         type: String,
//         required: [true, "Father's name is a required field"],
//         minlength: [3, "Father's name must be at least 3 characters long"],
//         maxlength: [30, "Father's name can be maximum 30 characters"],
//         trim: true
//     },

//     father_name_bangla: {
//         type: String,
//         required: [true, "Father's Bangla name is a required field"],
//         minlength: [3, "Father's Bangla name must be at least 3 characters long"],
//         maxlength: [30, "Father's Bangla name can be maximum 30 characters"],
//         trim: true
//     },

//     mother_name: {
//         type: String,
//         required: [true, "Mother's name is a required field"],
//         minlength: [3, "Mother's name must be at least 3 characters long"],
//         maxlength: [30, "Mother's name can be maximum 30 characters"],
//         trim: true
//     },

//     mother_name_bangla: {
//         type: String,
//         required: [true, "Mother's Bangla name is a required field"],
//         minlength: [3, "Mother's Bangla name must be at least 3 characters long"],
//         maxlength: [30, "Mother's Bangla name can be maximum 30 characters"],
//         trim: true
//     },

//     guardian_name: {
//         type: String,
//         required: [true, "Guardian's name is a required field"],
//         minlength: [3, "Guardian's name must be at least 3 characters long"],
//         maxlength: [30, "Guardian's name can be maximum 30 characters"],
//         trim: true
//     },

//     guardian_name_bangla: {
//         type: String,
//         required: [true, "Guardian's Bangla name is a required field"],
//         minlength: [3, "Guardian's Bangla name must be at least 3 characters long"],
//         maxlength: [30, "Guardian's Bangla name can be maximum 30 characters"],
//         trim: true
//     },
//     guardian_phone: {
//         type: String,
//         required: [true, "Guardian's phone is a required field"],
//         minlength: [10, "Guardian's phone must be at least 10 characters long"],
//         maxlength: [15, "Guardian's phone can be maximum 15 characters"],
//         trim: true
//     },

//     guardian_email: {
//         type: String,
//         default: null,
//         validate: {
//             validator: (email) => {
//                 if (email) {
//                     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                     return emailRegex.test(email);
//                 }
//             },
//             message: 'Invalid email format'
//         }
//     },

//     date_of_birth: {
//         type: Date,
//         required: [true, "Date of birth is a required field"]
//     },


//     religion: {
//         type: String,
//         required: [true, "Religion is a required field"],
//         type: String,
//         enum: religion,
//         required: [true, "Religion is a required field"],
//         trim: true
//     },

//     phone: {
//         type: String,
//         required: [true, "Phone is a required field"],
//         minlength: [10, "Phone must be at least 10 characters long"],
//         maxlength: [15, "Phone can be maximum 15 characters"],
//         trim: true
//     },
//     email: {
//         type: String,
//         default: null,
//         validate: {
//             validator: (email) => {
//                 if (email) {
//                     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                     return emailRegex.test(email);
//                 }
//             },
//             message: 'Invalid email format'
//         }
//     },
//     address: {
//         type: String,
//         required: [true, "Address is a required field"],
//         minlength: [5, "Address must be at least 5 characters long"],
//         maxlength: [200, "Address can be maximum 200 characters"],
//         trim: true
//     },

//     gender: {
//         type: String,
//         enum: gender,
//         required: [true, "Gender is a required field"]
//     },

//     nameOfClass: {
//         type: String,
//         required: [true, "Class name is a required field"],
//         minlength: [2, "Class name must be at least 2 characters long"],
//         maxlength: [30, "Class name can be maximum 30 characters"],
//         enum: nameOfClass,
//         trim: true
//     },

//     sakha: {
//         type: String,
//         required: [true, "Sakha is a required field"],
//         enum: sakha,
//         trim: true
//     },

//     date_of_admission: {
//         type: Date,
//         required: [true, "Date of admission is a required field"]
//     },

//     roll: {
//         type: Number,
//         required: [true, "Roll is a required field"],

//         maxlength: [1000, "Roll can be maximum 1000 characters"],
//         trim: true
//     },

//     group: {
//         type: String,
//         required: [true, "Class category is a required field"],
//         enum: group,
//         required: [true, "Class category is a required field"],
//         trim: true
//     },

//     blood_group: {
//         type: String,
//         enum: blood_group,
//         required: [true, "Blood group is a required field"]
//     },

//     academic_year: {
//         type: Number,
//         required: [true, "Academic year is a required field"],
//         trim: true
//     }
//     ,
//     date_of_admission: {
//         type: Date,
//         required: [true, "Date of admission is a required field"]
//     },
//     avatar: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true });

// const Student = mongoose.model('Student', studentSchema);

// module.exports = Student;





//

const mongoose = require('mongoose');
const { nameOfClass, sakha, religion, gender, group, blood_group } = require('./data.json');
const generateRandomPassword = require('../helper/randompassword');
const addressSchema = new mongoose.Schema({
    // English address fields
    //division
    division: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    district: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    upazila: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    union: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    village: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    word_no: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    home: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    division_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    district_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    upazila_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },

    union_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    village_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    word_no_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    home_bangla: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
    },


});

const parantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Guardian's name is a required field"],
        minlength: [3, "Guardian's name must be at least 3 characters long"],
        maxlength: [30, "Guardian's name can be maximum 30 characters"],
        trim: true
    },
    name_bangla: {
        type: String,
        required: [true, "Guardian's Bangla name is a required field"],
        minlength: [3, "Guardian's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Guardian's Bangla name can be maximum 30 characters"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Guardian's phone is a required field"],
        minlength: [10, "Guardian's phone must be at least 10 characters long"],
        maxlength: [15, "Guardian's phone can be maximum 15 characters"],
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
    birth_no: {
        type: String,
        required: true,

    },
    nid_no: {
        type: String,
        required: true,

    },
    date_of_birth: {
        type: Date,
        required: [true, "Date of birth is a required field"]
    },

})

const guardianSchema = new mongoose.Schema({
    relation: {
        type: String,
        required: [true, "Guardian's name is a required field"],
        minlength: [3, "Guardian's name must be at least 3 characters long"],
        maxlength: [30, "Guardian's name can be maximum 30 characters"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "Guardian's name is a required field"],
        minlength: [3, "Guardian's name must be at least 3 characters long"],
        maxlength: [30, "Guardian's name can be maximum 30 characters"],
        trim: true
    },
    name_bangla: {
        type: String,
        required: [true, "Guardian's Bangla name is a required field"],
        minlength: [3, "Guardian's Bangla name must be at least 3 characters long"],
        maxlength: [30, "Guardian's Bangla name can be maximum 30 characters"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Guardian's phone is a required field"],
        minlength: [10, "Guardian's phone must be at least 10 characters long"],
        maxlength: [15, "Guardian's phone can be maximum 15 characters"],
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
    birth_no: {
        type: String,
        required: true,

    },
    nid_no: {
        type: String,
        required: true,

    },
    date_of_birth: {
        type: Date,
        required: [true, "Date of birth is a required field"]
    },

})

const studentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
        length: 10
    },
    birth_no: {
        type: String,
        required: true,

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
    gender: {
        type: String,
        enum: gender,
        required: [true, "Gender is a required field"]
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

    date_of_admission: {
        type: Date,
        required: [true, "Date of admission is a required field"]
    },

    roll: {
        type: Number,
        required: [true, "Roll is a required field"],

        maxlength: [1000, "Roll can be maximum 1000 characters"],
        trim: true
    },

    group: {
        type: String,
        required: [true, "Class category is a required field"],
        enum: group,
        required: [true, "Class category is a required field"],
        trim: true
    },

    blood_group: {
        type: String,
        enum: blood_group,
        required: [true, "Blood group is a required field"]
    },

    academic_year: {
        type: Number,
        required: [true, "Academic year is a required field"],
        trim: true
    }
    ,
    date_of_admission: {
        type: Date,
        required: [true, "Date of admission is a required field"]
    },
    avatar: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true,
    },
    address_bn: {
        type: String,
        required: true,
    },
    father: {
        type: parantsSchema,
        required: true,
    },
    mother: {
        type: parantsSchema,
        required: true,
    },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    qrcode: {
        type: String,
        set: () => generateRandomPassword(30)

    }


}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
