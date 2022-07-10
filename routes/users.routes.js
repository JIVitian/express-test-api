const express = require("express");
const usersService = require("../users.service");
const validateUser = require("../validator.service");
const userRoutes = express.Router();

userRoutes.get("", (req, res) => {
  res.send(usersService.getAllUsers());
});

// Obtain a user by id
userRoutes.get("/:id", (req, res) => {
  const user = usersService.findUserById(req.params.id);

  // If user is not found, return 404
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.send(user);
});

// Create a new user
userRoutes.post("", (req, res) => {
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
userRoutes.get("/:year/:month", (req, res) => {
  res.send({ ...req.params, ...req.query });
});

// Update a user
userRoutes.put("/:id", (req, res) => {
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
userRoutes.delete("/:id", (req, res) => {
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

module.exports = userRoutes;