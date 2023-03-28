const BookService = require("../models/Book.js");
const LoanService = require("../models/Loan.js");

async function index(req, res) {
  try {
    const books = await BookService.showAll();
    // Using json format temporarily for testing puposes.
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    const book = await BookService.show(req.params.book_name);
    if (book.length == 0) {
      res.status(404).json(book);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function showUserBooks(req, res) {
  try {
    let userId = req.get("user-id");
    const books = await LoanService.showAll(parseInt(userId));

    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const loan = await LoanService.create(req.body);
    res.status(201).json({ created: loan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const loan = await LoanService.update(parseInt(req.params.loan_id));
    res.status(200).json({ updated: loan });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  showUserBooks,
};
