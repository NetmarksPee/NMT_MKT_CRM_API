var express = require("express");
const date = require("date-and-time");
var router = express.Router();
const dbConfig = require("../config/db.config");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM mt_user`;
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

router.post("/getUser", (req, res) => {
  // Create the connection to database
  const connection2 = dbConfig();

  // Retrieve data from the request body
  const { user_name, password } = req.body;

  const sql = `SELECT * FROM mt_user WHERE user_name = ? and password = ? `;

  connection2.query(sql, [user_name, password], (error, results, fields) => {
    if (error) {
      return res.status(404).json("Error Selecting data: " + error.stack);
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    } else {
      res.json(results[0]);
    }
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
  const connection = dbConfig();
  const sql = `SELECT * FROM mt_user WHERE user_name = ? ORDER BY user_name`;

  // Create the connection to database

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
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});

router.post("/update", (req, res) => {
  // Create the connection to database
  const connection = dbConfig();
  console.log(req.body);
  // Retrieve data from the request body
  const {
    user_name,
    password,
    user_group_code,
    first_name,
    last_name,
    status,
    update_by,
  } = req.body;

  const updateDate = new Date();
  const updateDatevalue = date.format(updateDate, "YYYY/MM/DD HH:mm:ss");

  const sql = `UPDATE mt_user SET password = ?, user_group_code = ?,  first_name = ?, last_name = ?, status = ?, update_by = ?, update_date = ? 
    WHERE user_name = ?`;
  console.log(sql);
  connection.query(
    sql,
    [
      password,
      user_group_code,
      first_name,
      last_name,
      status,
      update_by,
      updateDatevalue,
      user_name,
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
  const connection = dbConfig();
  console.log(req.body);
  // Retrieve data from the request body
  const {
    user_name,
    password,
    user_group_code,
    first_name,
    last_name,
    status,
    create_by,
  } = req.body;

  const createDate = new Date();
  const createDatevalue = date.format(createDate, "YYYY/MM/DD HH:mm:ss");

  const sql =
    "INSERT INTO mt_user (user_name, password, user_group_code, first_name, last_name, status, create_date, create_by, update_date, update_by) VALUES	(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      user_name,
      password,
      user_group_code,
      first_name,
      last_name,
      status,
      createDatevalue,
      create_by,
      createDatevalue,
      create_by,
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

router.post("/delete", (req, res) => {
  // Create the connection to database
  const connection = dbConfig();

  // Retrieve data from the request body
  const { user_name } = req.body;

  const sql = "DELETE FROM mt_user WHERE user_name = ?";

  connection.query(sql, [user_name], (error, results, fields) => {
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
