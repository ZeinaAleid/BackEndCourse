const express = require("express");
const { request } = require("http");
const { urlencoded, json } = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config;
app.use(express.urlencoded({ extended: true }));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(json());

app.post("/scores", async (req, res) => {
  try {
    const { score, name } = req.body;
    if (!score || !name) return res.status(400).send("Missing required fields");
    const newplayer = await prisma.leaderboard.create({
      data: { score: Number(score), name },
    });
    res.status(201).send("a new player is added");
  } catch (err) {
    res.status(500).send({ error: { message: err.message } });
  }
});

app.get("/scores", async (req, res) => {
  const data = await prisma.leaderboard.findMany();
  data.sort((a, b) => b.score - a.score);
  if (data.length === 0) return res.status(404).json("Not Found");
  res.json(data);
});

app.delete("/scores/:id", async (req, res) => {
  try {
    const x = await prisma.leaderboard.findUnique({
      where: { id: req.params.id },
    });
    if (!x) return res.status(404).send("Player not found");
    const data = await prisma.leaderboard.delete({
      where: { id: req.params.id },
    });
    res.status(200).send("Player is deleted");
  } catch (err) {
    res.status(500).send({ error: { message: err.message } });
  }
});

app.listen(2000, () => {
  console.log("listen on port 2000");
});
