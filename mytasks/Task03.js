// Task 03

const express = require("express");
const { request } = require("http");
const app = express();

const fortunes = [
  "You will have a great day! 😊",
  "A surprise gift is on its way! 🎁",
  "Adventure is waiting for you! 🏕️",
  "Success is closer than you think! 🚀",
  "Happiness comes from within! 💛",
];

const jokes = [
  "Why don’t skeletons fight each other? They don’t have the guts! 😂",
  "Why did the math book look sad? Because it had too many problems. 📖",
  "Parallel lines have so much in common. It’s a shame they’ll never meet. 😆",
];

const facts = [
  "Did you know? Honey never spoils! 🍯",
  "Bananas are berries, but strawberries aren't! 🍌🍓",
  "Octopuses have three hearts! 🐙",
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/fortune", (req, res) => {
  res.send(fortunes[Math.floor(Math.random() * 5)]);
});
app.get("/joke", (req, res) => {
  res.send(jokes[Math.floor(Math.random() * 3)]);
});
app.get("/fact", (req, res) => {
  res.send(facts[Math.floor(Math.random() * 3)]);
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
