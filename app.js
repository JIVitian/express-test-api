const express = require("express");
const morgan = require("morgan");
const config = require("config");
const userRoutes = require("./routes/users.routes");
// Define debugs for development and production
const debug = require("debug")("app:server");
const dbDebug = require("debug")("app:db");

// Create a new express application instance
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Public folder for static files
app.use(express.static("public"));
// Redirect all requests to the users route
app.use("/api/users", userRoutes);

// Logging environment configuration
console.log("Application Name: " + config.get("name"));
console.log("Database: " + config.get("configDB.host"));

// If we are not in production, log to console
if(app.get("env") === "development") {
  // Using Morgan for logging in a file
  // console.log("Morgan is enabled");
  debug("Morgan is enabled");
  app.use(morgan("dev"));
}

dbDebug("DB is enabled");

// Define a environment variable to the port
const port = process.env.PORT || 3000;

// Listen on port 3000, on all network interfaces
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
