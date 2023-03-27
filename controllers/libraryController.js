const BookService = require('../models/Book.js');

async function index(req, res) {
    try {
        const books = await BookService.showAll();
        console.log(books)
        // Using json format temporarily for testing puposes.
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
}

module.exports = { index };