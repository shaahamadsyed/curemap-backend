const History = require("../models/History");

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.userId;

        const history = await History.find({ userId });

        const dates = history.map(h => h.date);

        res.json({ dates, history });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
