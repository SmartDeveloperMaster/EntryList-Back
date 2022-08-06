const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express = require("express");
const { QrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");
dotenv.config()
const apiRouter = express.Router();
const SALTING  = parseInt(process.env.SALTING);

apiRouter.post("/sendVisitorData", (req, res) => {
  const { visitorName, visitorPhoneNumber, visitorDivision, visitorReason, temperature } = req.body;
  const cardId = bcrypt.hashSync(req.body.cardId, SALTING);
  const entranceTime = date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  visitorModel
  .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, entranceTime, cardId, temperature })
    .then((result) => {
      // console.log(result)
      QrCodeModel.findOne({ originalCode: req.body.cardId }, {isActive:1, _id:0}).then((result) => {console.log(result)})
      QrCodeModel.findOneAndUpdate({originalCode: req.body.cardId}, {isActive: true})
      .then((result) => {
        res.send(true)
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    })
    .catch((err) => {
      res.status(500).send(err);
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
    res.status(500).send(err);
    console.log(err)
  });
});

apiRouter.post("/visitorEntrance",(req,res) => {
  const query = {isEntrance: { $eq: true}, cardId: {$ne: null}, entranceDay:{$eq:new Date().getDate()}}
  const readField = {visitorName:1,isEntrance:1,cardId:1,entranceTime:1,exitTime:1,_id:0};
  visitorModel.find(query, readField)
  .then((result) => {
    res.send(result)
    // 찾은 데이터 모두 업데이트 할 방법 찾기
  }).catch((err) => {
    res.status(500).send(err);
    console.log(err)
  }
)
})

apiRouter.post("/test12",(req,res) => {
  QrCodeModel.findOne({originalCode: req.body.cardId}).then(result => {console.log(result)})
})


module.exports = apiRouter;