// Put all the user routes in this file.

// Set up our own little mini application.
const express = require("express");

// `router` is just like `app`, but it's like a mini app, entirely on its own,
// that lives in our main application. The stuff we set up on this router will
// be sort of independent of the main application.
const router = express.Router();

// Let's move the logger middleware function into this users router
router.use(logger2);

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
  // res.send("New User Form");
  // Render a form so we can submit some data
  res.render("users/new", { firstName: "Test" });
});

// When you submit the New User Form, you'll post to an endpoint that will
// create the user.
router.post("/", (req, res) => {
  // res.send("Create a user");

  // On the request we have the post body and any named fields in that body. But
  // by default Express does not let you access them. Need to use a built-in
  // middleware to do this: express.urlencoded()
  // console.log(req.body.firstName); // this should work now

  const isValid = false;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    // .redirect() changes the URL completely, immediately navigates the user
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    // Send them cback to the new user form, but prepopulate the fields with
    // what they submitted
    res.render("users/new", { firstName: req.body.firstName });
  }
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
    // router.param(), acting as middleware, injected `user` into req, so it is
    // now available here
    console.log(req.user);
    res.send(`Get user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });

// router.param() runs anytime it finds a param that matches the name you pass
// in. Only runs the code inside, nothing else. So you have to call next() to
// run the next thing inline. So router.param acts like a type of middleware,
// i.e., stuff that runs between the request being sent to your server and the
// actual response being returned to the user.

// Here, let's create an array of users, and assume the id in the URL is the
// index of the array. We can retrieve the user object and inject it into req
// before the other route functions run. Saves us from having to put all this
// logic into each route function.
const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  // console.log(id);
  req.user = users[id];
  // Move on to the next piece of middleware
  next();
});

function logger2(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
