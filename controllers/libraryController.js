const BookService = require('../models/Book.js');
const LoanService = require('../models/Loan.js');

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
};

// async function showUserBooks(res, req) {
//     try {
// //         console.log(req.body)
//         console.log(JSON.stringify(req.headers))
// //         console.log(req.get('username'))
// //         // const books = await LoanService.showAll(parseInt(req.body.user_id))
//         // res.status(200).json(books)
//         res.send(books)
//     } catch (error) {
//         // res.status(404).json({'error': error.message})
//         res.send('error')
//     }
// };

async function create(req, res) {
    try {
        const loan = await LoanService.create(req.body);
        res.status(201).json({'created': loan})
    } catch (error) {
        res.status(500).json({'error': error.message})
    }
};

async function update(req, res) {
    try {
        const loan = await LoanService.update(parseInt(req.params.loan_id))
        res.status(200).json({'updated': loan})
    } catch (error) {
        res.status(404).json({'error': error.message})
    }
};

module.exports = { 
    index,
    show,
    create,
    update,
    // showUserBooks,
};