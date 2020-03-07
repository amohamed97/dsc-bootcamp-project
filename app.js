const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/static_files'));
app.use(bodyParser.urlencoded({ extended: true }));

// Data
let articlesArr = [
  {
    id: 1,
    title: "1st Article",
    body:
      "Amet sit do tempor laborum. Qui in aliquip officia reprehenderit voluptate occaecat elit amet id elit ea. Sint sunt quis duis id eiusmod non sint aute."
  },
  {
    id: 2,
    title: "2nd Article",
    body:
      "Amet sit do tempor laborum. Qui in aliquip officia reprehenderit voluptate occaecat elit amet id elit ea. Sint sunt quis duis id eiusmod non sint aute."
  }
];

let nextID = 3

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
    id: nextID,
    title: submittedArticle.title,
    body: submittedArticle.body
  });
  nextID++;
  res.redirect('/');
});

app.get('/articles/:articleId', (req, res) => {
    let articleId = req.params.articleId;
    let foundArticle = articlesArr.find(function(article){
        return article.id === Number(articleId)
    })
    if(foundArticle){
        res.render('article', {article: foundArticle})
    }else{
        res.status(404).end()
    }
})

app.get('/articles/delete/:articleId', (req, res) => {
    let articleId = req.params.articleId;
    articlesArr = articlesArr.filter(function(article){
        return article.id !== Number(articleId)
    })
    res.redirect('/')
})

// Starting the server with port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
