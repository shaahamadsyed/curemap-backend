const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/curemap");
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("DB Error:", err.message);
        process.exit(1); // Exit if DB fails
    }
};

module.exports = connectDB;
