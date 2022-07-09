const express = require("express");
const usersService = require("./users.service");
const validateUser = require("./validator.service");
const morgan = require("morgan");
const config = require("config");
// Define debug mode
const debug = require("debug")("app:server");
const dbDebug = require("debug")("app:db");

// Create a new express application instance
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Public folder for static files
// app.use(express.static("public"));

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  res.send(usersService.getAllUsers());
});

// Obtain a user by id
app.get("/api/users/:id", (req, res) => {
  const user = usersService.findUserById(req.params.id);

  // If user is not found, return 404
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.send(user);
});

// Create a new user
app.post("/api/users", (req, res) => {
  // Check the request body against the schema
  const result = validateUser(req.body);

  // If the request body is invalid, return 400 with a message
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Create a new user
  const user = usersService.addUser(req.body.name);

  // Return the new user
  res.send(user);
});

// Get users by year and month
app.get("/api/users/:year/:month", (req, res) => {
  res.send({ ...req.params, ...req.query });
});

// Update a user
app.put("/api/users/:id", (req, res) => {
  // Validate the user
  const result = validateUser(req.body);

  // If the request body is invalid, return 400 with a message
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Update the user if exists
  const user = usersService.updateUser(req.params.id, req.body.name);

  // If user was not found, return 404
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  // Return the updated user
  res.send(user);
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  // remove the user if exists
  const user = usersService.deleteUser(req.params.id);

  // If user is not found, return 404
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  // Return the deleted user
  res.send(user);
});


// Define a environment variable to the port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
