var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
//const dbConfig  = require('./config/db.config');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var usergroupsRouter = require("./routes/usergroups");
var activityflagRouter = require("./routes/ActivityFlag");
var CustomerRouter = require("./routes/Customer");
var usergroupPermissionsRouter = require("./routes/userpermission");
var personalRouter = require("./routes/Personal");
var menuRouter = require("./routes/menus");
var saleRouter = require("./routes/Sales");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*เอดิ
app.use(function(req, res, next) {
  req.db = connection;
});*/

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/usergroups", usergroupsRouter);
app.use("/activityflag", activityflagRouter);
app.use("/Customer", CustomerRouter);
app.use("/userpermisson", usergroupPermissionsRouter);
app.use("/personal", personalRouter);
app.use("/menu", menuRouter);
app.use("/sales", saleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
