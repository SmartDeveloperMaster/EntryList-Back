const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const abRequire = require("abrequire");
const apiRouter = abRequire("routers/api.js");

dotenv.config();

const { PORT, MONGODB_URI } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(
  MONGODB_URI || "mongodb://localhost/visitor-app",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (e) => {
    if (e) throw e;
    console.info("MONGODB CONNECTED");
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

const port = PORT || 3005;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
