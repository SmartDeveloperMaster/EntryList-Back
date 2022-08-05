const bcrypt = require("bcrypt");
const express = require("express");
const { QrCodeModel } = require("../models/qrCode");

const QrRouter = express.Router();

const SALTING = 6

QrRouter.post("/sendQrCode", (req, res) => {
  const { qrCode, ...body } = req.body;
  const hash_qrCode = bcrypt.hashSync(qrCode, bcrypt.genSaltSync(SALTING));
  QrCodeModel.create({ encryptedCode: hash_qrCode, originalCode:qrCode, ...body })
    .then((result) => {
      res.send(true)
      console.log(result)
    }).catch((err) => {
      res.status(500).send(err);
      console.log(err)
    });
})

QrRouter.post("/checkQrCode", (req, res) => {
  const { qrCode } = req.body;
  QrCodeModel.findOne({ originalCode: qrCode }, {encryptedCode:1, originalCode:1, _id:0})
  .then((result) => {
    // 들어온 qr코드의 값을 db에 있는 값과 대조해서 일치하는지 확인한다. -> 일치하면 퇴장 프로세스 실행.
    bcrypt.compare(qrCode, result.encryptedCode)
    .then((isTrue) => {
      if(isTrue){
        // 여기서 퇴장 프로세스 실행해주면 될듯.
        // 현재 api에 있는 퇴장 프로세스를 함수단위로 분리해서 사용하면 될것같다.
        res.send(true)
        console.log(isTrue)
        console.log(result)
      }
      else{
        res.send(false)
      }
    }).catch((err) => {
      res.status(500).send(err);
      console.log(err)
    })

  }).catch((err) => {
    res.status(500).send(err);
    console.log(err)
  })
})

module.exports = QrRouter;