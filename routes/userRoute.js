const express = require("express");
const router = express.Router();
const {
  registerUser,
  logIn,
  addContact,
  getUser,
  getContacts,
  setAvatar,
} = require("../controller/userController");

// Register User Route
router.post("/register", registerUser);

// login Route
router.post("/login", logIn);

// Find User By Id
router.get("/getUser/:userId", getUser);

// Add Contact Route
router.put("/addContact", addContact);

// Get Contact of the User
router.get("/getContacts/:userId", getContacts);

// Set Avatar of the user
router.put("/setAvatar", setAvatar);

module.exports = router;
