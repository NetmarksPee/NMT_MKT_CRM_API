var express = require("express");
const date = require("date-and-time");
var router = express.Router();
const dbConfig = require("../config/sqlSim.config");
const sql = require("mssql");

async function getSale() {
  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    const sql3 = `SELECT        dbo.MT_User.UserID, dbo.MT_User.Username, dbo.MT_User.Email, dbo.MT_UserGroup.UserGroupCode, dbo.MT_UserGroup.UserGroupName, dbo.MT_UserGroup.UserGroupDescription
FROM            dbo.MT_User INNER JOIN
                         dbo.MT_UserGroup ON dbo.MT_User.UserGroupID = dbo.MT_UserGroup.UserGroupID`;

    // Query the database
    let result = await pool.request().query(sql3);

    // Close the connection
    await sql.close();

    return result.recordset; // Return the result set
  } catch (err) {
    console.error("SQL error", err);
    throw err; // Rethrow the error for further handling
  }
}

router.get("/", async (req, res) => {
  try {
    // Call the database function
    const data = await getSale();
    //res.json(JSON.parse(data[0][Object.keys(data[0])[0]]));

    res.json(data); // Parse JSON string to object
    //res.status(200).json(JSON.parse(data)); // Send the data as JSON response
    //res.json.status(500).send("Error fetching data");
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
