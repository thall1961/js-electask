const express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  routes = require("./routes");

const isProduction = process.env.NODE_ENV === "production";
require("dotenv").config({ path: "variables.env" });

const app = express();

app.use(cors());

// express defaults
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  mongoose.set("debug", true);
}

/// register models
require("./models/Task");

// serve static files from the react app
app.use(express.static(path.join(__dirname, "client/build")));

/// routing
app.use("/", routes);

/// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
