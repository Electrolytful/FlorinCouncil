const LocationService = require("../models/Location.js");
const LoanService = require("../models/Location.js");

async function index(req, res) {
  try {
    const locations = await LocationService.showAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { index };
