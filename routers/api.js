const express = require("express");
const { visitorModel } = require("../models/visitor");

const apiRouter = express.Router();

apiRouter.post("/", (req, res) => {
  const { visitorName, visitorPhoneNumber, visitorDivision, visitorReason, temp, ...body } = req.body;
  visitorModel
    .create({ visitorName, visitorPhoneNumber, visitorDivision, visitorReason, temp, ...body })
    .then((e) => {
      res.send(e);
    })
    .catch((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = apiRouter;