const express = require("express");
const seedUser = require("../controllers/seedController");

const seedRouter = express.Router();

seedRouter.get("/seed",  seedUser);

module.exports = seedRouter;
