const History = require("../models/History");
const Doctor = require("../models/Doctor");

/* --- SIMPLE PREDICTION LOGIC --- */
function predictDisease(symptoms) {
  symptoms = symptoms.map(s => s.toLowerCase());

  if (symptoms.includes("chest pain")) return { disease: "Heart Attack", specialization: "heart" };
  if (symptoms.includes("headache")) return { disease: "Migraine", specialization: "brain" };
  if (symptoms.includes("cough")) return { disease: "Bronchitis", specialization: "lungs" };
  if (symptoms.includes("stomach pain")) return { disease: "Gastritis", specialization: "kidney" };

  return { disease: "Unknown", specialization: "general" };
}

exports.getResult = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: "Please provide an array of symptoms" });
    }

    // const userId = req.user.userId;
    const userId = req.user.id;


    // Predict disease + specialization
    const { disease, specialization } = predictDisease(symptoms);

    // ✅ Fetch only doctors whose specialization matches predicted specialization (case-insensitive)
    // const doctors = await Doctor.find({
    //   specialization: { $regex: `^${specialization}$`, $options: "i" }
    // }).lean();
    // Replace your current query
const doctors = await Doctor.find({
  specialization: { $regex: specialization, $options: "i" }
}).lean();


    // Save prediction in history
    const historyRecord = await History.create({
      userId,
      symptoms,
      predictedDisease: disease,
      specialization
    });

    // Send response with predicted disease + specialization + matched doctors
    res.json({
      disease,
      specialization,
      doctors, // only matched doctors
      historyRecord
    });
  } catch (err) {
    console.error("Get result error:", err);
    res.status(500).json({ message: err.message });
  }
};
