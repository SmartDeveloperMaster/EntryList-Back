const express = require("express");
const { createVisitorData, 
        qrCodeExistCheck, 
        exitVisitor } = require("../controllers/visitorCtrl");

const apiRouter = express.Router();

apiRouter.post("/sendVisitorData", async (req, res) => {
    if(await qrCodeExistCheck(req.body)){
        res.send(await createVisitorData(req.body))
    }else{
        // qr코드가 db에 없는 값일때
        res.status(500).send(false)
    }
})

apiRouter.post("/visitorExit", async (req, res) => {
    if(await qrCodeExistCheck(req.body)){
        res.send(await exitVisitor(req.body))
    }else{
        // qr코드가 db에 없는 값일때
        res.status(500).send(false)
    }
})

module.exports = apiRouter;