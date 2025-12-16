const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://curemao-ui.vercel.app",
  credentials: true
}));

app.use(express.json());
// app.use(cors());
require("./config/db")();

const { register, login } = require("./controllers/authController");
const { getDashboard } = require("./controllers/dashboardController");
const { getResult } = require("./controllers/resultController");
const auth = require("./middleware/authMiddleware");

const Doctor = require("./models/Doctor");
app.post("/register", register);
app.post("/login", login);

app.get("/dashboard", auth, getDashboard);

app.post("/result", auth, getResult);

app.get("/", (req, res) => {
    res.send("CureMap Backend Running...");
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

