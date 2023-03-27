const db = require('../database/dbConnect.js');

class Book {
    constructor(id, title, author, year) {
        this.id = id
        this.title = title
        this.author = author
        this.year = year
    }
};

// Class that will handle all DB interaction.
class BookService {
    static mapToModel(dbResponse) {
        return dbResponse.rows.map(e => new Book(e.id, e.title, e.author, e.year));
    }

    static async showAll() {
        const books = await db.query(`
        SELECT *
        FROM books
        `)
        return BookService.mapToModel(books)
    }

    static async show(id) {
        const book = await db.query(`
        SELECT *
        FROM books
        WHERE id = $1`,
        [id])
        return BookService.mapToModel(book)
    }
}

module.exports = BookService;