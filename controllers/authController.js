const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed });

        res.json({ message: "register Successful", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message)
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Email" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid Password" });

        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret123");

        // res.json({ message: "Login successful", token });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret123");

res.json({ 
    message: "Login successful", 
    token,
    user: { _id: user._id, name: user.name, email: user.email } // <-- add this
});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
