const express = require("express");
const { visitorModel } = require("../models/visitor");

const apiRouter = express.Router();

apiRouter.post("/sendVisitorData", (req, res) => {
  const { visitorName, visitorPhoneNumber, visitorDivision, visitorReason, cardId, temperature, ...body } = req.body;
  const entranceTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  visitorModel
  .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, entranceTime, cardId, temperature, ...body })
    .then((result) => {
      res.send(true)
      console.log(result)
    })
    .catch((err) => {
      // res.status(404).send(err);
      res.send(err);
      console.log(err)
    });
});

apiRouter.post("/visitorExit",(req,res) => {
  const { cardId } = req.body
  const exitTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  visitorModel.findOneAndUpdate({cardId, isEntrance:true}, {isEntrance: false, exitTime, cardId:null})
  .then((result) => {
    if(typeof result){
      res.send(true)
    }
    else{
      
      res.send(false)
    }
    
  })
  .catch((err) => {
    res.status(404).send(err);
    console.log('error')
  });
});

// 사용 안하는거같음
// apiRouter.post("/checkVisitor", (req,res) => {
//    const { cardId } = req.body.cardId
//    visitorModel.findOne({cardId})
//    .then((result) => {
//     // console.log('result', result)
//     if(result !== null){
//       res.send(true)
//     }else{
//       res.send(false)
//     }
//    })
// })

module.exports = apiRouter;