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

// When you submit the New User Form, you'll post to an endpoint that will
// create the user.
router.post("/", (req, res) => {
  res.send("Create a user");
});

// To retrieve a user by id we want a dynamic route based on the URL
// router.get("/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`Get user with ID ${userId}`);
// });

// Just be careful with dynamic routes! Everything does from top to bottom in
// Express. So of you put router.get('/new') after router.get(':id'), and the
// user hits /users/new, it will match the :id first, and try to get a user with
// ID 'new'. So put any static routes **above** your dynamic routes.

// You probably will have other routes based on user ID
// router.put("/:id", (req, res) => {
//   res.send(`Update user with ID ${req.params.id}`);
// });

// router.delete("/:id", (req, res) => {
//   res.send(`Delete user with ID ${req.params.id}`);
// });

// .get, .put, and .delete all have the same route. So you can call .route() to
// take the route argument and then chain on the other HTTP method functions.
// Cleans up your code a little bit.
router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });

module.exports = router;
