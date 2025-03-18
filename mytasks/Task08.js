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

app.get("/videogames", async (req, res) => {
  const data = await prisma.videogames.findMany();
  if (data.length === 0) return res.status(404).json("Not Found");
  res.json(data);
});

app.get("/videogames/:id", async (req, res) => {
  const data = await prisma.videogames.findUnique({
    where: { id: req.params.id },
  });
  if (!data) return res.status(404).json("Not Found");
  res.json(data);
});

app.post("/videogames", async (req, res) => {
  try {
    const { name, releasedate, rating } = req.body;
    if (!name || !releasedate || !rating)
      return res.status(400).send("Missing required fields");
    const newgame = await prisma.videogames.create({
      data: { name, releasedate, rating },
    });
    res.status(201).send("New video game added successfully");
  } catch (err) {
    res.status(500).send({ error: { message: err.message } });
  }
});

app.put("/videogames/:id", async (req, res) => {
  try {
    const { name, releasedate, rating } = req.body;
    const newgame = await prisma.videogames.update({
      where: { id: req.params.id },
      data: { name, releasedate, rating },
    });
    res.status(201).send("Updated successfully");
  } catch (err) {
    res.status(500).send({ error: { message: err.message } });
  }
});

app.delete("/videogame/:id", async (req, res) => {
  try {
    const x = await prisma.videogames.findUnique({
      where: { id: req.params.id },
    });
    if (!x) return res.status(404).send("this VideoGame not found");
    const data = await prisma.videogames.delete({
      where: { id: req.params.id },
    });
    res.status(200).send("Successfully deleted");
  } catch (err) {
    res.status(500).send({ error: { message: err.message } });
  }
});

app.listen(2000, () => {
  console.log("listen on port 2000");
});
