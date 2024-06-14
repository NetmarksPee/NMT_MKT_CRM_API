var express = require("express");
const date = require("date-and-time");
var router = express.Router();
const dbConfig = require("../config/sql.config");
const sql = require("mssql");

async function getCustomerNetPed() {
  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    const sql3 = `SELECT mt_customer.*,
                            (SELECT * FROM mt_customeraddress 
                            WHERE mt_customeraddress.customercode = mt_customer.customercode  
                            FOR JSON PATH) AS address
                      FROM mt_customer FOR JSON PATH`;

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

async function getCustomer() {
  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    const sql3 = `SELECT *
                      FROM mt_customer`;

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

async function getCustomerList() {
  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    const sql3 = `SELECT        dbo.MT_Customer.CustomerCode, dbo.MT_Customer.CustomerName1, dbo.MT_Customer.CustomerName2, dbo.MT_CustomerGroup.CustomerGroupName, dbo.MT_Salesperson.SalespersonName,
dbo.MT_CustomerAddress.Address1, dbo.MT_CustomerAddress.City, dbo.MT_CustomerAddress.PostCode, dbo.MT_CustomerAddress.Email1, dbo.MT_CustomerAddress.ContactPerson1, dbo.MT_Customer.PaymentTermCode,
dbo.MT_Customer.BillingDate, dbo.MT_Customer.PaymentDate, dbo.MT_Customer.TaxID, dbo.MT_Customer.WHTaxType, dbo.MT_Customer.WHTaxCode, dbo.MT_Customer.CurrencyCode, dbo.MT_Customer.LocationCode,
dbo.MT_Customer.CreateBy, dbo.MT_Customer.CreateDate, dbo.MT_Customer.Status, dbo.MT_CustomerIndustry.IndustryName, dbo.MT_CustomerIndustry.Status AS Expr1, dbo.MT_CustomerType.CustomerTypeName,
dbo.MT_CustomerHQ.HQCode, dbo.MT_CustomerHQ.HQName,  dbo.MT_CustomerAddress.website
FROM            dbo.MT_Customer INNER JOIN
dbo.MT_CustomerAddress ON dbo.MT_Customer.CustomerCode = dbo.MT_CustomerAddress.CustomerCode INNER JOIN
dbo.MT_CustomerGroup ON dbo.MT_Customer.CustomerGroupCode = dbo.MT_CustomerGroup.CustomerGroupCode INNER JOIN
dbo.MT_CustomerHQ ON dbo.MT_Customer.HQCode = dbo.MT_CustomerHQ.HQCode INNER JOIN
dbo.MT_CustomerIndustry ON dbo.MT_Customer.IndustryCode = dbo.MT_CustomerIndustry.IndustryCode INNER JOIN
dbo.MT_CustomerType ON dbo.MT_Customer.CustomerType = dbo.MT_CustomerType.CustomerTypeCode INNER JOIN
dbo.MT_Salesperson ON dbo.MT_Customer.SalespersonCode = dbo.MT_Salesperson.SalespersonCode`;

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

async function getCustomerIndustry() {
  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    const sql3 = `select * from [dbo].[MT_CustomerIndustry] where Status = 'A'`;

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
    const data = await getCustomer();
    //res.json(JSON.parse(data[0][Object.keys(data[0])[0]]));

    res.json(data); // Parse JSON string to object
    //res.status(200).json(JSON.parse(data)); // Send the data as JSON response
    //res.json.status(500).send("Error fetching data");
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

router.get("/detail", async (req, res) => {
  try {
    // Call the database function
    const data = await getCustomerNetPed();
    res.json(JSON.parse(data[0][Object.keys(data[0])[0]]));
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

router.get("/List", async (req, res) => {
  try {
    // Call the database function
    const data = await getCustomerList();
    //res.json(JSON.parse(data[0][Object.keys(data[0])[0]]));

    res.json(data); // Parse JSON string to object
    //res.status(200).json(JSON.parse(data)); // Send the data as JSON response
    //res.json.status(500).send("Error fetching data");
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

router.get("/Industry", async (req, res) => {
  try {
    // Call the database function
    const data = await getCustomerIndustry();
    //res.json(JSON.parse(data[0][Object.keys(data[0])[0]]));

    res.json(data); // Parse JSON string to object
    //res.status(200).json(JSON.parse(data)); // Send the data as JSON response
    //res.json.status(500).send("Error fetching data");
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
