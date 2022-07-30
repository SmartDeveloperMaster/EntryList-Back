const express = require("express");
const { visitorModel } = require("../models/visitor");

const apiRouter = express.Router();

apiRouter.post("/sendVisitorData", (req, res) => {
  const { visitorName, visitorPhoneNumber, visitorDivision, visitorReason, cardId, temperature, ...body } = req.body;
  const entranceTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  visitorModel
  .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, entranceTime, cardId, temperature, ...body })
    .then((result) => {
      console.log(result._id);
      res.send(result)
    })
    .catch((data) => {
      console.log(data);
      res.json(data);
    });
});

apiRouter.post("/visitorExit",(req,res) => {
  const { cardId } = req.body
  const exitTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  visitorModel.findOneAndUpdate({cardId, isEntrance:true}, {isEntrance: false, exitTime, cardId:null})
  .then((result) => {
    res.send(result)
  })
  .catch((data) => {
    console.log(data);
    res.json(data);
  });
});

apiRouter.post("/checkVisitor", (req,res) => {
   const { cardId } = req.body.cardId
   visitorModel.findOne({cardId})
   .then((result) => {
    console.log('result', result)
    if(result !== null){
      res.send(true)
    }else{
      res.send(false)
    }
   })
})

module.exports = apiRouter;