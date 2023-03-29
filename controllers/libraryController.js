const BookService = require("../models/Book.js");
const LoanService = require("../models/Loan.js");

async function index(req, res) {
  try {
    const books = await BookService.showAll();
    res.status(200).render("library/libraryIndex", { books: books });
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
    let userId = req.session.user.id;
    const books = await LoanService.showAll(parseInt(userId));

    res.status(200).render("library/mybooks", { books: books });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function loanBook(req, res) {
  try {
    let splittedUrl = req.originalUrl.split('/');
    let bookId = splittedUrl[splittedUrl.length - 2];

    let userId = req.session.user.id;

    await LoanService.create(userId, bookId);

    return await showUserBooks(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function returnBook(req, res) {
  try {
    let splittedUrl = req.originalUrl.split('/');
    let bookId = splittedUrl[splittedUrl.length - 2];

    await LoanService.update(bookId);

    return await showUserBooks(req, res);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  index,
  show,
  loanBook,
  returnBook,
  showUserBooks,
};
