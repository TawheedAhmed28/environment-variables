require('dotenv').config();

const express = require('express');

const mongoose = require("mongoose")



const app = express();

const methodOverride = require("method-override")
const morgan = require("morgan")

const path = require("path")

const StardewValleyCrops = require("./models/stardewvalleycrops.js")

mongoose.connect(process.env.MONGODB_URI)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

/*-----------------------------------------------------------------------------------------*/

// * Getting all the crops:

app.get("/stardewcrops", async (req, res) => {
  const stardewcrops = await StardewValleyCrops.find()
  res.render("crops.ejs", {stardewcrops})
})

// * Adding (posting) a crop:

app.get("/new-crop", (req, res) => {
  res.render("newcrop.ejs")
})

app.post("/stardewcrops", async (req, res) => {
  console.log(req.body)
  const stardewcrop = await StardewValleyCrops.create(req.body)
  res.redirect("/stardewcrops")
})

// * Getting an individual crop:

app.get("/stardewcrops/:cropID", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findById(req.params.cropID)
  res.render("show.ejs", {stardewcrop})
})

// * Deleting an individual crop:

app.delete("/stardewcrops/:cropID", async (req, res) => {
  await StardewValleyCrops.findByIdAndDelete(req.params.cropID)
  res.redirect("/stardewcrops")
})

// * Editing (putting) an individual crop:

app.put("/stardewcrops/:cropID", async (req, res) => {
  await StardewValleyCrops.findByIdAndUpdate(req.params.cropID, req.body)
  res.redirect("/stardewcrops/" + req.params.cropID)
})

app.get("/stardewcrops/:cropID/edit", async (req, res) => {
  const stardewcrop = await StardewValleyCrops.findById(req.params.cropID)
  res.render("editcrop.ejs", {
    crop: stardewcrop
  })
})

// ? findByIdAndUpdate(req.params.cropID, req.body, {new: true}) would still push the correct info to MongoDB, but instead would return the new object in Postman instead of the old one, as seen with my code here

// App "listener":

app.listen(3000, () => {
  console.log('Listening on port 3000');
  console.log(`Your secret is ${process.env.SECRET_PASSWORD}`)
});
