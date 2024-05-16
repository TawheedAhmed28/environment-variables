const mongoose = require("mongoose")
require("dotenv").config()

const StardewValleyCrops = require("./models/stardewvalleycrops.js")

async function seed() {
    console.log("I've lost my sanity...")
    mongoose.connect(process.env.MONGODB_URI)
    console.log("...but I still have you. <3")

    const pumpkin = await StardewValleyCrops.create({
        name: "Pumpkin",
        growth_days: 13,
        season: "Fall"
    })

    console.log(pumpkin)

    mongoose.disconnect()
}

seed()