const bcrypt = require("bcrypt");
const express = require("express");
const { qrCodeModel } = require("../models/qrCode");

const QrRouter = express.Router();

const SALTING = 10

QrRouter.post("/sendQrCode", (req, res) => {
  const { qrCode, ...body } = req.body;
  const hash_qrCode = bcrypt.hashSync(qrCode, bcrypt.genSaltSync(SALTING));
  qrCodeModel.create({ encryptedCode: hash_qrCode, originalCode:qrCode, ...body })
    .then((result) => {
      res.send(true)
      console.log(result)
    }).catch((err) => {
      res.status(500).send(err);
      console.log(err)
    });
})

QrRouter.post("/checkQrCode", (req,res) => {
  const { qrCode } = req.body;
  qrCodeModel.findOne({ originalCode: qrCode })
  .then(result => {
    bcrypt.compare(qrCode, result.encryptedCode, (err, result) => {
      if(result){
        res.send(true)
      }
      else{
        res.send(false)
      }
    })
  })
})

module.exports = QrRouter;