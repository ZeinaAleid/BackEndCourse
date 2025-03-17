const express = require("express");
const { request } = require("http");
const { urlencoded } = require("body-parser");
const dotenv = require("dotenv");
dotenv.config;
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const ress = await prisma.leaderboard.findMany();
  return ress;
}

app.get("/leaderboard", async (req, res) => {
  res.send(main());
});

app.listen(30000, () => {
  console.log("listen on port 30000");
});
