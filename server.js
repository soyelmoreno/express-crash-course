const express = require("express");
const app = express();

// Set the view engine
// app.set("view engine", "pug");
app.set("view engine", "ejs");
// Now rename markup file to have a .ejs extension instead of .html
// To get syntax highlighting, install the VSCode extension EJS Language Support

// Routes

// Each HTTP method has its own function
// app.get(routeStr, (req, res, next) => {})
// app.post()
// app.put()
// app.delete()
// app.patch()

app.get("/", (req, res) => {
  console.log("route: /");
  // res.send is not commonly used. Just a text response, typically for testing
  // res.send("Hello");

  // So let's send something more specific. An HTTP status code
  // res.sendStatus(500);

  // Generally when you send a status code you also want to send a message
  // res.status(500).send("Sorry, something went wrong");

  // Even better, send down some JSON
  // res.status(500).json({ message: "Error with the bits" });

  // Default is a success. Just send the JSON
  // res.json({ message: "Looks like it worked" });

  // You might want to send the user a file to download
  // res.download("server.js");

  // Most of the time, however, you'll either be sending down some JSON, or
  // you'll be sending an HTML file to render
  // res.render("index");

  // With just index.html, this results in a browser error: "Error: No default
  // engine was specified and no extension was provided". We want to run server
  // code to generate the contents of the view that we send down.

  // So set up EJS as our view engine. Embedded JavaScript templates. Could also
  // use Pug. So up above, tell our app to use the EJS view engine.

  // To pass data to the view, pass an object as a second parameter to the
  // render() function
  // res.render("index", { text: "World" });
  res.render("index", { text2234: "World" });
});

// But what if we have hundreds of routes? This file would become huge and
// difficult to deal with. So we create a router, which is a small instance of
// your application that has its own logic applied to it. Then you can just
// insert that into the main application.

// // List all users
// app.get("/users", (req, res) => {
//   res.send("User List");
// });

// // Create a new user
// app.get("/users/new", (req, res) => {
//   res.send("New User Form");
// });

// This works, but would make more sense to put everything related to users in
// its own file, so that its encapsulated and this file stays organized.

const userRouter = require("./routes/users");

// Link up these routes with our main app with app.use()
app.use("/users", userRouter);

// Another example. Say you had routes related to posts. Put them all in their
// own file, create a router, and use it here
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

// Start the server listening on this port
app.listen(3010);
