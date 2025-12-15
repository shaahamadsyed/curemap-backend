const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String,
    symptoms: [String],
    predictedDisease: String,
    specialization: String
});

module.exports = mongoose.model("History", historySchema);
