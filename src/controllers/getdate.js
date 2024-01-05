const NodeCache = require("node-cache");
const Teacher = require("../models/teacher");
const myCache = new NodeCache();
const getdata = async (req, res, next) => {
    const teacher = await Teacher.find();

    console.log(teacher);
}

getdata()