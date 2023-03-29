const db = require("../database/dbConnect.js");

class Loan {
  constructor(id, book_id, book_name, author, year, user_id, date, complete) {
    this.id = id;
    this.book_id = book_id;
    this.user_id = user_id;
    this.date = date;
    this.book_name = book_name;
    this.author = author;
    this.year = year;
    this.complete = complete;

  }
}

class LoanService {
  static mapToModel(dbResponse) {
    return dbResponse.rows.map(
      (e) => new Loan(e.id, e.book_id, e.title, e.author, e.year, e.user_id, e.date, e.complete)
    );
  }

  static async showAll(user_id) {
    const loans = await db.query(
      `
        SELECT *
        FROM loans l
        JOIN books b on l.book_id = b.id 
        WHERE l.user_id = $1
        ORDER BY l.complete, l.id DESC`,
      [user_id]
    );
    return LoanService.mapToModel(loans);
  }

  static async create(user_id, book_id) {
    try {
      const loan = await db.query(
        `
          INSERT INTO loans (book_id, user_id, loan_date)
          VALUES ($1, $2, NOW())
          RETURNING *`,
        [book_id, user_id]
      );
      return LoanService.mapToModel(loan);
    } catch (error) {
      return error.message
    }
  }

  static async update(book_id) {
    try {
      const loan = await db.query(
        `
          UPDATE loans
          SET complete = $1
          WHERE book_id = $2 AND complete = false
          RETURNING *`,
        [true, book_id]
      );
      return LoanService.mapToModel(loan);
    } catch (error) {
      return error.message
    }
  }
}

module.exports = LoanService;
