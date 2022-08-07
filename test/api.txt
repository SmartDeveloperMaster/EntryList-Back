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


module.exports = apiRouter;