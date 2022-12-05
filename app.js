const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router=require('./router/router')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function run() {
 app.use("/", router);
  app.listen(process.env.port, () => {
    console.log(`port runnig on server ${process.env.port}`);
  });
}
run();
