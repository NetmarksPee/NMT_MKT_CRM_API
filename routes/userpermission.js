var express = require("express");
const date = require("date-and-time");
var router = express.Router();
const dbConfig = require("../config/db.config");

router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM mt_usergrouppermission`;
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

/*router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  const sql = `SELECT * FROM mt_usergrouppermission WHERE user_group_permission_code = ? ORDER BY user_group_permission_code`;

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
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});*/

router.get("/:user_group", function (req, res, next) {
  const { user_group } = req.params;

  const sql = `SELECT user_group_permission_code,user_group_code,mt_menu.menu_code,mt_menu.name,view_flag,
  create_flag,update_flag,export_flag,mt_usergrouppermission.create_date,mt_usergrouppermission.create_by,mt_usergrouppermission.update_date
  ,mt_usergrouppermission.update_by FROM mt_menu LEFT JOIN mt_usergrouppermission 
  on mt_usergrouppermission.menu_code = mt_menu.menu_code AND mt_usergrouppermission.user_group_code = ? ORDER BY mt_menu.menu_code + 0 ASC`;

  // Create the connection to database
  const connection = dbConfig();

  connection.query(sql, [user_group], (error, results) => {
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
      res.json(results);
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

router.post("/postusergroup", function (req, res, next) {
  const { user_group } = req.body;
  console.log(req.body);
  const sql = `SELECT * FROM mt_usergrouppermission WHERE user_group_code = ? ORDER BY user_group_permission_code`;

  // Create the connection to database
  const connection = dbConfig();

  connection.query(sql, [user_group], (error, results) => {
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

router.post("/getusergrouppermission", (req, res) => {
  // Create the connection to database
  const connection2 = dbConfig();

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

  const sql = `UPDATE mt_usergrouppermission SET user_group_permission_code = ?, view_flag = ?, create_flag = ?, update_flag = ?, export_flag = ? 
    , update_date = ?, update_by = ? WHERE user_group_code = ?`;

  connection2.query(
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
  const {
    user_group_permission_code,
    user_group_code,
    menu_code,
    view_flag,
    create_flag,
    update_flag,
    export_flag,
    create_by,
  } = req.body;
  console.log(req.body);
  const createDate = new Date();
  const createDatevalue = date.format(createDate, "YYYY/MM/DD HH:mm:ss");

  const sql =
    "INSERT INTO `mt_usergrouppermission` (`user_group_code`, `menu_code`, `view_flag`, `create_flag`, `update_flag`, `export_flag`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES	(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  connection2.query(
    sql,
    [
      user_group_code,
      menu_code,
      view_flag,
      create_flag,
      update_flag,
      export_flag,
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
  connection2.end((err) => {
    if (err) {
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("Connection closed.");
  });
});

router.post("/delete", (req, res) => {
  // Create the connection to database
  const connection2 = dbConfig();

  // Retrieve data from the request body
  const { user_group_code } = req.body;

  const sql = `DELETE FROM mt_usergrouppermission WHERE user_group_code = ? `;

  connection2.query(sql, [user_group_code], (error, results, fields) => {
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
