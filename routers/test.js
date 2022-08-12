const express = require("express");
const { testModel } = require("../models/test");
const { qrCodeModel } = require("../models/qrCode");
const testRouter = express.Router();

testRouter.post("/sendVisitorData", (req, res) => {
  visitorName = "테스트"
  visitorPhoneNumber = "010-1234-5678"
  visitorDivision = "전체"
  visitorReason = "그냥"
  cardId = 8
  temperature = 36.5
  // const { visitorName, visitorPhoneNumber, visitorDivision, visitorReason, cardId, temperature, ...body } = req.body;
  const entranceTime = date = new Date().toTimeString().split(" ")[0];
  testModel
  // .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, entranceTime, cardId, temperature, ...body })
  .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, entranceTime, cardId, temperature })
    .then((result) => {
      res.send(true)
      console.log(result)
    })
    .catch((err) => {
      // res.status(500).send(err);
      res.send(err);
      console.log(err)
    });
});


testRouter.post("/qrTest", (req,res) => {
  const {cardId} = req.body
  qrCodeModel.findOne({originalCode: cardId})
  .then(result => {
    if(result !== null){
      res.send(true)
    }else{
      res.status(500).send(false)
    }
  }).catch(err => {
    res.status(500).send(false)
  })
})

module.exports = testRouter;