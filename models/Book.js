const db = require("../database/dbConnect.js");

class Book {
  constructor(id, title, author, year) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

// Class that will handle all DB interaction.
class BookService {
  static mapToModel(dbResponse) {
    return dbResponse.rows.map(
      (e) => new Book(e.id, e.title, e.author, e.year)
    );
  }

  static async showAll() {
    const books = await db.query(`
        SELECT B.* 
        FROM BOOKS B
        WHERE B.ID NOT IN (SELECT BOOK_ID FROM LOANS WHERE COMPLETE = FALSE)
        `);

    return BookService.mapToModel(books);
  }

  static async show(bookName) {
    const book = await db.query(
      `
        SELECT *
        FROM books
        WHERE title = $1`,
      [bookName]
    );
    return BookService.mapToModel(book);
  }
}

module.exports = BookService;
