const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("static_files"));
app.use(bodyParser.urlencoded({ extended: true }));

// Data
let articlesArr = [
  {
    title: "1st Article",
    body:
      "Amet sit do tempor laborum. Qui in aliquip officia reprehenderit voluptate occaecat elit amet id elit ea. Sint sunt quis duis id eiusmod non sint aute."
  },
  {
    title: "2nd Article",
    body:
      "Amet sit do tempor laborum. Qui in aliquip officia reprehenderit voluptate occaecat elit amet id elit ea. Sint sunt quis duis id eiusmod non sint aute."
  }
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { articles: articlesArr });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  submittedArticle = req.body;
  articlesArr.push({
    title: submittedArticle.title,
    body: submittedArticle.body
  });
  res.redirect('/')
});

// Starting the server with port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
