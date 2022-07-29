const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const abRequire = require("abrequire");
const apiRouter = abRequire("routers/api.js");
const mongooseConnect = abRequire("config/mongoose.js");

dotenv.config();

const { PORT, MONGODB_URI } = process.env;

const port = PORT || 3005;
const url = MONGODB_URI || 'mongodb://localhost/visitor-app';

mongooseConnect(url);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", (req,res) => {
  date = new Date().toLocaleString({timeZone: "Asia/Seoul"})
  res.send(`server time is ${date}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
