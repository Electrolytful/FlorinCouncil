// file to setup and load the database with values
require("dotenv").config();

const fs = require("fs");
const db = require("./dbConnect.js");

const sql = fs.readFileSync("./database/setup.sql").toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Setup complete.");
  })
  .catch((error) => console.log(error));
