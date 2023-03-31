const LocationService = require("../models/Location.js");

async function index(req, res) {
  try {
    const locations = await LocationService.showAll();
    res
      .status(200)
      .render("attractions/attractionsIndex", { attractions: locations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { index };
