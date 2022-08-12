const express = require("express");
const { visitorModel } = require("../models/visitor");
const { adminAccess } = require("../controllers/adminCtrl");
const { adminModel } = require("../models/admin");

const adminRouter = express.Router();

adminRouter.post("/", (req,res) => {
    const { lookupYear, lookupMonth } = req.body
    const query = {entranceYear: {$eq : lookupYear}, entranceMonth: { $eq: lookupMonth }}
    const readField = {visitorName:1,visitorPhoneNumber:1,visitorReason:1,entranceTime:1,exitTime:1,_id:0, entranceMonth:1, entranceDay:1};
    visitorModel.find(query, readField)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(500).send(err);
        console.error(err);
    })
})

adminRouter.post("/access", async(req, res) => {
    res.send(await adminAccess(req.body))
})

adminRouter.post("/get", (req,res) => {
    const { adminKey } = req.body
    console.log(adminKey)
    adminModel.create({adminKey:adminKey})
    .then((result) => {
        res.send(true)
    }).catch((err) => {
        res.status(500).send(err);
        console.log(err)
    })
})

module.exports = adminRouter;