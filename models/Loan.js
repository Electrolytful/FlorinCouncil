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
    static async create(data) {

    }
}

module.exports = LoanService;