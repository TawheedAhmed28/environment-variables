require('dotenv').config();

const express = require('express');

const mongoose = require("mongoose")

const app = express();

const StardewValleyCrops = require("./models/stardewvalleycrops.js")

mongoose.connect(process.env.MONGODB_URI)

app.get('/', (req, res) => {
  res.send('The server is running');
});

app.use(express.json())

// * Getting all the crops:

app.get("/stardewcrops", async (req, res) => {
  const stardewcrops = await StardewValleyCrops.find()
  console.log(stardewcrops)
  res.send(stardewcrops)
})

app.post("/stardewcrops", async (req, res) => {
  console.log(req.body)
  const stardewcrop = await StardewValleyCrops.create(req.body)
  res.send(stardewcrop)
})

app.get("/stardewcrops/:cropID", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findById(req.params.cropID)
  res.send(stardewcrop)
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
  console.log(`Your secret is ${process.env.SECRET_PASSWORD}`)
});
