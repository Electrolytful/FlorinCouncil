const DonationService = require('../models/Donation.js');

async function index(req, res) {
    try {
        const donations = await DonationService.showAll();
        res.status(200).render("recycling_center/donations", { donations: donations})
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
};

async function donateItem(req, res) {
    try {
        let splittedUrl = req.originalUrl.split('/');
        let donationId = splittedUrl[splittedUrl.length -1];
        console.log(req.originalUrl)
        console.log(splittedUrl)
        console.log(donationId)

        await DonationService.update(donationId)
        return await index(req,res);
    } catch (error) {
        res.status(404).json({'error': error.message})
    }
};

module.exports = { 
    index,
    donateItem,
};