const BookService = require('../models/Book.js');

async function index(req, res) {
    try {
        const books = await BookService.showAll();
        // Using json format temporarily for testing puposes.
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
};

async function show(req, res) {
    try {
        const book = await BookService.show(parseInt(req.params.book_id));
        res.status(200).json(book)
    } catch (error) {
        res.status(404).json({'error': error.message})
    }
}

module.exports = { 
    index,
    show,
};