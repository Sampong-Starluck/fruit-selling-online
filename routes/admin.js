const express = require("express");
const router = express.Router(); // redirect page form homepage or to homepage
    // for controller

router.get("/", (req, res) => {
    res.render("index");
});

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

module.exports = router;