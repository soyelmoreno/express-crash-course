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
  res.render("index");

  // With just index.html, this results in a browser error: "Error: No default
  // engine was specified and no extension was provided". We want to run server
  // code to generate the contents of the view that we send down.

  // So set up EJS as our view engine. Embedded JavaScript templates. Could also
  // use Pug. So up above, tell our app to use the EJS view engine.
});

// Start the server listening on this port
app.listen(3010);
