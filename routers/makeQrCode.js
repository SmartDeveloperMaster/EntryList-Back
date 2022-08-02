const bcrypt = require("bcrypt");
const express = require("express");
const { QrCodeModel } = require("../models/qrCode");

const QrRouter = express.Router();

const SALTING = 6

QrRouter.post("/sendQrCode", (req, res) => {
    let { originalCode } = req.body;

    if (typeof(originalCode) !== "string") {
        console.log('not a string')
        originalCode = String(originalCode);
    }

    const encryptedCode = 
    bcrypt.hashSync(bcrypt.hashSync(originalCode, SALTING), SALTING);

    console.log(encryptedCode)
    QrCodeModel
    .create({ originalCode, encryptedCode })
      .then((result) => {
        res.send(true)
        console.log('success')
      })
      .catch((err) => {
        res.send(err);
      });
})

module.exports = QrRouter;