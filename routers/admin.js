const express = require("express");
const { visitorModel } = require("../models/visitor");

const adminRouter = express.Router();

adminRouter.get("/", (req,res) => {
    // const { lookupMonth } = req.body
    lookupMonth = 8
    const query = {entranceMonth: { $eq: lookupMonth }}
    const readField = {visitorName:1,visitorPhoneNumber:1,visitorReason:1,entranceTime:1,exitTime:1,_id:0};
    visitorModel.find(query, readField)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(500).send(err);
        console.error(err);
    })
})

module.exports = adminRouter;