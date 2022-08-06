const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express = require("express");
const { QrCodeModel } = require("../models/qrCode");
const { visitorModel } = require("../models/visitor");
const { createVisitorData, qrCodeVerification, qrCodeExistCheck } = require("../controllers/visitorCtrl");
dotenv.config()
const justRouter = express.Router();
const SALTING  = parseInt(process.env.SALTING);

justRouter.post("/sendVisitorData", (req, res) => {
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

justRouter.post("/visitorExit",(req,res) => {
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

justRouter.post("/visitorEntrance",(req,res) => {
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

justRouter.post("/test1", async(req,res) => {
  if(createVisitorData(req.body)){
    res.send('성공')
  }else{
    res.send('실패')
  }
})


justRouter.post("/test2", async(req,res) => {
  if(qrCodeVerification(req.body.cardId)){
    res.send('존재하는 코드입니다')
  }else{
    res.send('존재하지 않는 코드입니다.')
  }
})

justRouter.post("/test3", async(req,res) => {
  qrCodeVerification(req.body.cardId)
})

module.exports = justRouter;