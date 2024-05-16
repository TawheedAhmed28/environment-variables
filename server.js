require('dotenv').config();

const express = require('express');

const mongoose = require("mongoose")

const app = express();

const StardewValleyCrops = require("./models/stardewvalleycrops.js")

mongoose.connect(process.env.MONGODB_URI)

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.use(express.json())

/*-----------------------------------------------------------------------------------------*/

// * Getting all the crops:

app.get("/stardewcrops", async (req, res) => {
  const stardewcrops = await StardewValleyCrops.find()
  console.log(stardewcrops)
  res.render("crops.ejs", {stardewcrops})
})

// * Adding (posting) a crop:

app.post("/stardewcrops", async (req, res) => {
  console.log(req.body)
  const stardewcrop = await StardewValleyCrops.create(req.body)
  res.send(stardewcrop)
})

// * Getting an individual crop:

app.get("/stardewcrops/:cropID", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findById(req.params.cropID)
  res.render("cropinfo.ejs", {stardewcrop})
})

// * Deleting an individual crop:

app.delete("/stardewcrops/:cropID", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findByIdAndDelete(req.params.cropID)
  res.send(stardewcrop)
})

// * Editing (putting) an individual crop:

app.put("/stardewcrops/:cropID", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findByIdAndUpdate(req.params.cropID, req.body)
  res.send(stardewcrop)
})

// ? findByIdAndUpdate(req.params.cropID, req.body, {new: true}) would still push the correct info to MongoDB, but instead would return the new object in Postman instead of the old one, as seen with my code here

// App "listener":

app.listen(3000, () => {
  console.log('Listening on port 3000');
  console.log(`Your secret is ${process.env.SECRET_PASSWORD}`)
});
