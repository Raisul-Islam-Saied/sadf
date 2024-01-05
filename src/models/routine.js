const { priority, day, nameOfClass, sakha } = require('./data.json')

const { Schema, model } = require("mongoose");
const schema = new Schema(
    {
        teacher_id: {
            type: String,
            required: true,
            length: 8
        },
        subject: {
            type: String,
            required: [true, "subject name is required field"],
            minlength: ["2", "name must be at least 3 cherecters long"],
            maxLength: ["30", "name can be maximum 30 characters"],
            trim: true,
        },
        teacher: {
            type: String,
            required: [true, "teacher name is required field"],
            minlength: ["2", "name must be at least 3 cherecters long"],
            maxLength: ["30", "name can be maximum 30 characters"],
            trim: true,
        },
        from: {
            type: String,
            required: true,
        }, to: {
            type: String,
            required: true,
        },
       
        priority: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5, 6, 7]
        },
        day: {
            required: true,
            type: String,
            enum: day
        },
        nameOfClass: {
            type: String,
            required: true,
            enum: nameOfClass
        },
        sakha: {
            type: String,
            required: true,
            enum: sakha
        }
    },
    { timestamps: true }
);

const Routine = model("Routine", schema);

module.exports = Routine;
