const express = require("express");
const { visitorModel } = require("../models/visitor");
const { createVisitorData, 
        qrCodeExistCheck, 
        qrCodeVerification, 
        exitData } = require("../controllers/visitorCtrl");

const apiRouter = express.Router();

apiRouter.post("/sendVisitorData", async (req, res) => {
    if(await createVisitorData(req.body) === true){
        res.send(true)
    }else{
        res.send(false)
    }
})

apiRouter.post("/visitorExit", async (req, res) => {
    
})

module.exports = apiRouter;