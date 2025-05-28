// Put all the user routes in this file.

// Set up our own little mini application.
const express = require("express");

// `router` is just like `app`, but it's like a mini app, entirely on its own,
// that lives in our main application. The stuff we set up on this router will
// be sort of independent of the main application.
const router = express.Router();

// router has functions like .get(), .post(), etc. So we can replace `app` with
// `router` in these routes

// List all users
// router.get("/users", (req, res) => {
//   res.send("User List");
// });

// // Create a new user
// router.get("/users/new", (req, res) => {
//   res.send("New User Form");
// });

// But the nice thing about a router is that we can nest it inside of a parent
// route.
router.get("/", (req, res) => {
  res.send("User List");
});

router.get("/new", (req, res) => {
  res.send("New User Form");
});

module.exports = router;
