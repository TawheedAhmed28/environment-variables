const mongoose = require("mongoose")

const stardewValleyCropSchema = new mongoose.Schema({
    name: {type: String, required: true},
    growth_days: {type: Number, required: true},
    season: {type: String, required: true},
})

module.exports = mongoose.model("StardewValleyCrop", stardewValleyCropSchema)