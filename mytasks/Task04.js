//Task 04

const express = require("express");
const { request } = require("http");
const { urlencoded } = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
let x = 2;
const missionsarr = [
  {
    id: 1,
    missionname: "first",
    astronauts: ["Ahmad", "Mohammed"],
    progress: 95,
  },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/missions", (req, res) => {
  res.send(missionsarr);
});

app.post("/missions", (req, res) => {
  const data = req.body;
  data.astronauts = JSON.parse(data.astronauts);
  missionsarr.push(data);
  missionsarr[missionsarr.length - 1].id = x;
  x++;
  res.send("Mission added successfully");
});

app.get("/missions/:id", (req, res) => {
  const idd = req.params.id;
  if (idd < x) res.send(missionsarr[idd - 1]);
  else res.send("Not Found");
});

app.put("/missions/:id", (req, res) => {
  const idd = req.params.id;
  const data = req.body;
  if (idd < x) {
    data.id = idd;
    data.astronauts = JSON.parse(data.astronauts);
    missionsarr[idd - 1] = data;
    res.send("Mission updated successfully");
  } else res.send("error: not found");
});

app.delete("/missions/:id", (req, res) => {
  const idd = req.params.id;
  missionsarr.splice(idd - 1, 1);
  for (i = idd - 1; i < missionsarr.length; i++) missionsarr[i].id = i + 1;
  x = missionsarr[missionsarr.length - 1].id + 1;
  if (idd >= x) res.send("Mission not fount");
  else res.send("Mission deleted successfully");
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
