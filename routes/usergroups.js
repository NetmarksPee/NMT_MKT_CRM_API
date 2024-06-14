var express = require('express');
const date = require("date-and-time");
var router = express.Router();
const dbConfig  = require('../config/db.config');

//router.get('/', function(req, res, next) {
//    res.send('respond with a resource of Users Group !!!');
//  });

router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM mt_usergroup LEFT JOIN cf_status ON cf_status.status_code = mt_usergroup.status`;
  // Create the connection to database
  //const connection = req.db;
  const connection = dbConfig();

  connection.query(sql, (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error fetching data from MySQL", Err: { error } });
      //res.json(error);
      //return;
    }

    res.json(results);
  });
  // Close the connection  
  connection.end((err) => {
      if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
      }
      console.log('Connection closed.');
  });
});

router.get("/:code", function (req, res, next) {
  //const { id } = req.params;
  const code = req.params.code;

  const sql = `SELECT * FROM mt_usergroup WHERE user_group_code = ? ORDER BY user_group_code`;

  // Create the connection to database
  //const connection = req.db;
  const connection = dbConfig();

  connection.query(sql, [code], (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error fetching data from MySQL", Err: { error } });
      //res.json(error);
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    } else {
      res.json(results[0]);
    }
  });
    // Close the connection    
    connection.end((err) => {
      if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
      }
      console.log('Connection closed.');
  });
});


router.post("/update", (req, res) => {
  // Create the connection to database
  //const connection = req.db;
  const connection = dbConfig();

  // Retrieve data from the request body
  const {
    user_group_code,
    user_group_name,
    user_group_description,
    status,
    update_by,
  } = req.body;

  const updateDate = new Date();
  const updateDatevalue = date.format(updateDate, "YYYY/MM/DD HH:mm:ss");

  const sql = `UPDATE mt_usergroup SET user_group_name = ?, user_group_description = ?,  status = ?, update_date = ?, update_by = ?
   WHERE user_group_code = ?`;

  connection.query(
    sql,
    [
      user_group_name,
      user_group_description,
      status,
      updateDatevalue,
      update_by,
      user_group_code,
    ],
    (error, results, fields) => {
      if (error) {
        res.json("Error updating data: " + error.stack);
        return;
      }

      res.json("Data updated successfully.");
    }
  );

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});

router.post("/insert", (req, res) => {
  // Create the connection to database
  //const connection = req.db;
  const connection = dbConfig();

  // Retrieve data from the request body
  const {
    user_group_code,
    user_group_name,
    user_group_description,
    status,
    update_by,
  } = req.body;

  const createDate = new Date();
  const createDatevalue = date.format(createDate, "YYYY/MM/DD HH:mm:ss");

  const sql =
    "INSERT INTO mt_usergroup(user_group_code,user_group_name,user_group_description,status,create_date,create_by,update_date,update_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?) ";
  console.log(req.body);
  connection.query(
    sql,
    [
      user_group_code,
      user_group_name,
      user_group_description,
      status,
      createDatevalue,
      update_by,
      createDatevalue,
      update_by,
    ],
    (error, results, fields) => {
      if (error) {
        res.json("Error inserted data: " + error.stack);
        return;
      }
      res.json("Data inserted successfully.");
    }
  );

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});

router.post("/remove", (req, res) => {
  // Create the connection to database
  const connection = dbConfig();

  // Retrieve data from the request body
  const { user_group_code } = req.body;

  const sql = `DELETE FROM mt_usergroup WHERE user_group_code = ? `;

  connection.query(sql, [user_group_code], (error, results, fields) => {
    if (error) {
      res.json("Error updating data: " + error.stack);
      return;
    }
    res.json("Data deleted successfully.");
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

module.exports = router;