var express = require('express');
const date = require("date-and-time");
var router = express.Router();
const dbConfig  = require('../config/db.config');

router.post("/getUser", (req, res) => {
    // Create the connection to database
    const connection2 = dbConfig();
  
    // Retrieve data from the request body
    const { user_name,  password } = req.body;
  
    const sql = `SELECT * FROM mt_user WHERE user_name = ? and password = ? `;
  
    connection2.query(
      sql,
      [
        user_name,  password
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(404).json("Error Selecting data: " + error.stack)
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: "Record not found" });
        } else {
          res.json(results[0]);
        }
      }
    );
  
    // Close the connection
    connection2.end((err) => {
      if (err) {
        console.error("Error closing database connection: " + err.stack);
        return;
      }
      console.log("Connection closed.");
    });
});


router.get("/", function (req, res, next) {
    const connection2 = dbConfig();
  
    const sql = `SELECT * FROM mt_activity_flag ORDER BY id`;
    connection2.query(sql, (error, results) => {
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
    connection2.end((err) => {
      if (err) {
        console.error("Error closing database connection: " + err.stack);
        return;
      }
      console.log("Connection closed.");
    });
});
  
router.get("/:id", function (req, res, next) {
    const { id } = req.params;
  
    const sql = `SELECT * FROM mt_activity_flag WHERE id = ? ORDER BY id`;
  
    // Create the connection to database
    const connection = dbConfig();
  
    connection.query(sql, [id], (error, results) => {
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

router.get("/getstatus/:status_group", function (req, res, next) {
    const { status_group } = req.params;
  
    const sql = `SELECT * FROM cf_status WHERE status_group = ? ORDER BY status_index`;
  
    // Create the connection to database
    const connection = setConnection();
  
    connection.query(sql, [status_group], (error, results) => {
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
        console.error('Error closing database connection: ' + err.stack);
        return;
        }
        console.log('Connection closed.');
    });
});
  
router.post("/update", (req, res) => {
    // Create the connection to database
    const connection2 = dbConfig();
  
    // Retrieve data from the request body
    const { id, name, type, description, status } = req.body;
  
    const updateDate = new Date();
    const updateDatevalue = date.format(updateDate, "YYYY/MM/DD HH:mm:ss");
  
    const sql = `UPDATE mt_activity_flag SET name = ?, type = ?, description = ?, status = ?, update_date = ?, update_by= 'Admin'  WHERE id = ?`;
  
    connection2.query(
      sql,
      [
        name,
        type,
        description,
        status,
        updateDatevalue,
        id
      ],
      (error, results, fields) => {
        if (error) {
          res.json("Error updating data: " + error.stack);
        }
  
        res.json("Data updated successfully.");
      }
    );
  
    // Close the connection
    connection2.end((err) => {
      if (err) {
        console.error("Error closing database connection: " + err.stack);
        return;
      }
      console.log("Connection closed.");
    });
});
  
  
router.post("/insert", (req, res) => {
    // Create the connection to database
    const connection2 = dbConfig();
  
    // Retrieve data from the request body
    const { name, type, description, status } = req.body;
  
    const createDate = new Date();
    const createDatevalue = date.format(createDate, "YYYY/MM/DD HH:mm:ss");
  
    const sql = `INSERT INTO mt_activity_flag(name, description, type, status, create_date, create_by) VALUES(?, ?, ?, ?, ?, ?) `;
  
    connection2.query(
      sql,
      [name, description, type, status, createDatevalue, "Admin"],
      (error, results, fields) => {
        if (error) {
          res.json("Error updating data: " + error.stack);
          return;
        }
        res.json("Data inserted successfully.");
      }
    );
  
    // Close the connection
    connection2.end((err) => {
      if (err) {
        console.error("Error closing database connection: " + err.stack);
        return;
      }
      console.log("Connection closed.");
    });
});
  
router.post("/remove", (req, res) => {
    // Create the connection to database
    const connection2 = dbConfig();
  
    // Retrieve data from the request body
    const { id } = req.body;
  
    const sql = `DELETE FROM mt_activity_flag WHERE id = ? `;
  
    connection2.query(sql, [id], (error, results, fields) => {
      if (error) {
        res.json("Error updating data: " + error.stack);
        return;
      }
      res.json("Data deleted successfully.");
    });
  
    // Close the connection
    connection2.end((err) => {
      if (err) {
        console.error("Error closing database connection: " + err.stack);
        return;
      }
      console.log("Connection closed.");
    });
});

module.exports = router;
  