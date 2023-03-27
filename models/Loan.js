const db = require('../database/dbConnect.js');

class Loan {
    constructor(id, book_id, user_id, date, complete) {
        this.id = id
        this.book_id = book_id
        this.user_id = user_id
        this.date = date
        this.complete = complete
    }
}

class LoanService {
    static mapToModel(dbResponse) {
        return dbResponse.rows.map(e => new Loan(e.id, e.book_id, e.user_id, e.data, e.complete))
    }
    static async create(data) {
        const loan = await db.query(`
        INSERT INTO loans (book_id, user_id, loan_date)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [data.book_id, data.user_id, data.date])
        return LoanService.mapToModel(loan)
    }
}

module.exports = LoanService;