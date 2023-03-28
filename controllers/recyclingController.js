const DonationService = require('../models/Donation.js');

async function index(req, res) {
    try {
        const donations = await DonationService.showAll();
        res.status(200).json(donations)
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
};

module.exports = { index };