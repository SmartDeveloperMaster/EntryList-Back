const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const connectHandler = () => {
  console.log("MongoDB is connected");
};

const crashHandler = (err) => {
  console.log("MongoDB connection error:", err);
};

db.once("open", connectHandler);
db.on("error", crashHandler);