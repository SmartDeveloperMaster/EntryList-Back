const express = require("express");
const { visitorModel } = require("../models/visitor");

const adminRouter = express.Router();

adminRouter.get("/", (req,res) => {
    console.log("get /admin")
})

module.exports = adminRouter;