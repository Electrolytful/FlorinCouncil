const DonationService = require('../models/Donation.js');

async function index(req, res) {
    try {
        const donations = await DonationService.showAll();
        res.status(200).json(donations)
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
};

async function update(req, res) {
    try {
        const donation = await DonationService.update(parseInt(req.params.id))
        res.status(200).json({'updated': donation})
    } catch (error) {
        res.status(404).json({'error': error.message})
    }
};

module.exports = { 
    index,
    update,
};