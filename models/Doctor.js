// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//     doctorName: String,
//     hospitalName: String,
//     experience: Number,
//     rating: Number,
//     specialization: String
// },{collection:'doctors'});

// module.exports = mongoose.model("Doctor", doctorSchema);

// final code
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorName: String,
    hospitalName: String,
    experience: Number,
    rating: Number,
    specialization: String,
    location: String,      // ✅ new
    phoneNo: String         // ✅ new
  },
  { collection: "doctors" }
);

module.exports = mongoose.model("Doctor", doctorSchema);
