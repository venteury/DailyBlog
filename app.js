//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//lodash is used to handle the link with - and upper-lower case
var _ = require("lodash");
// const nodeMailer = require('nodemailer')

const homeStartingContent ="Here you can add your blogs by clicking on the icon and you can visit it through the Link."
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var blogs = [];

app.get("/", (request, response) => {
  response.render("home", {
    homeStartingContent: homeStartingContent,
    post: blogs,
  });
  // console.log(blogs.length);
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/contact", (request, response) => {
  response.render("contact");
});

app.get("/compose", (request, response) => {
  response.render("compose");
});

app.post("/compose", (req, res) => {
  var blog = {
    title: req.body.title,
    post: req.body.postContent,
  };
  blogs.push(blog);
  res.redirect("/");
});

// this will create a dynamic url route path and check
// whether title of any blog matches the route name
app.get("/blog/:blogName", (req, res) => {
  // console.log(req.params.blogName);
  blogs.forEach(function (item) {
    if (_.lowerCase(item.title) == _.lowerCase(req.params.blogName)) {
      console.log("Match found");
      res.render("post", {
        title: item.title,
        para: item.post,
      });
      return;
    }
    console.log("Not Matched");
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
