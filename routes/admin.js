const express = require("express");
const router = express.Router(); // redirect page form homepage or to homepage
const floController = require("../controller/floController");// for controller

// router.get("/", (req, res) => {
//   res.render("index");
// });

// for register new User
router.get('/register', floController.signUp);
router.get('/login', floController.login);
router.get('/logout', floController.logout);

// for render ejs
router.get('/', floController.dashboard);
router.get('/signin', floController.signIn);
router.get('/signup', floController.signUp);

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/blog", (req, res) => {
  res.render("blog");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/fruit", (req, res) => {
  res.render("fruit");
});

// router.get("/login", (req, res) => {
//   res.render("login");
// });

// router.get("/register", (req, res) => {
//   res.render("register");
// });

module.exports = router;
