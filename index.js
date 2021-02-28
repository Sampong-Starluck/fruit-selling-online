// dependentcy
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const postRoutes = require("./routes/admin");

const app = express(); // express app

// cookie session
app.use(cookieParser());
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1hour
      sameSite: true,
      secure: false
    },
    secret: "This is my spacial secret",
    name: "sid",
  })
);

// set view engine and where the file come from
app.set('view engine', 'ejs');
app.set("views", "views");

// set encoder and path for design and js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(postRoutes);

mongoose.connect(
    "mongodb+srv://Sampong:Samponglim3788@cluster0.gtkhs.mongodb.net/production?retryWrites=true&w=majority"
).then((result) => {
    app.listen(3000);
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});


