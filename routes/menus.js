var express = require("express");
const date = require("date-and-time");
var router = express.Router();
const dbConfig = require("../config/db.config");

module.exports = router;

router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM mt_menu ORDER BY menu_code + 0 ASC`;
  // Create the connection to database
  const connection = dbConfig();

  connection.query(sql, (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error fetching data from MySQL", Err: { error } });
      //res.json(error);
      return;
    }

    res.json(results);
  });
  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});
