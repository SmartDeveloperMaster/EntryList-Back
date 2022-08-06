const cors = require('cors')
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const abRequire = require("abrequire");
const apiRouter = abRequire("routers/api.js");
const testRouter = abRequire("routers/test.js");
const justRouter = abRequire("test/onlyApiTest.js");
const adminRouter = abRequire("routers/admin.js");
const QrCodeRouter = abRequire("routers/makeQrCode.js");
const mongooseConnect = abRequire("config/mongoose.js");

dotenv.config();

const { PORT, MONGODB_URI, PRODUCTLEVEL } = process.env;
let port;
let url;

if(PRODUCTLEVEL === "product"){
  port = PORT
  url = MONGODB_URI
}else{
  port = 3005
  url = "mongodb://localhost:27017/visitor-app"
}
// const port = PORT || 3005;
// const url = MONGODB_URI || 'mongodb://localhost/visitor-app';


mongooseConnect(url);

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/qr", QrCodeRouter);
app.use("/test", testRouter);
app.use("/justTest", justRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  if(PRODUCTLEVEL === "dev"){
  console.log(`Example app listening at http://localhost:${port}`);
  }else if(PRODUCTLEVEL === "product"){
    console.log(`Entrylist Server is started at http://localhost:${port}`);
  }
});
