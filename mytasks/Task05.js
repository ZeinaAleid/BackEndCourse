const express = require("express");
const { request } = require("http");
const { urlencoded } = require("body-parser");
const app = express();

app.get("/movie/:movieName", async (req, res) => {
  const name = req.params.movieName;
  const search = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
  const data = await search.json();
  const x = { id: "", title: "", rating: "", image: "" };
  x.id = data[0].show.id;
  x.title = data[0].show.name;
  x.rating = data[0].show.rating?.average;
  x.image = data[0].show.image?.medium;
  res.json(x);
});
app.get("/movie/:movieName/best", async (req, res) => {
  const search = await fetch(
    `https://api.tvmaze.com/search/shows?q=${req.params.movieName}`
  );
  const data = await search.json();
  const sortedMovies = data
    .map((item) => item.show)
    .sort((a, b) => {
      b.rating?.average - a.rating?.average;
    });
  res.send(sortedMovies[0].name);
});
app.listen(3001, () => {
  console.log("listen on port 3001");
});
//app.set("view engine", "ejs");

//app.get("/", (req, res) => {
// res.render("home", { id: "09a" });
//});
