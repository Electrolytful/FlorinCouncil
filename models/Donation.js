const db = require('../database/dbConnect.js');

class Donation {
    constructor (id, title, description, date, condition, donated, picture_url) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.condition = condition
        this.donated = donated
        this.picture_url = picture_url
    }
}

class DonationService {
    static mapToModel(dbResponse) {
        return dbResponse.rows.map(e => new Donation(e.id, e.title, e.description, e.date, e.condition, e.donated, e.picture_url));
    }

    static async showAll() {
        const donations = await db.query(`
        SELECT *
        FROM recycling_items
        WHERE donated = false
        `)
        console.log(donations.rows)
        return DonationService.mapToModel(donations)
    }

    static async update(id) {
        const donation = await db.query(`
        UPDATE recycling_items
        SET donated = $1
        WHERE id = $2
        RETURNING *`,
        [true, id])
        console.log(donation)
        return DonationService.mapToModel(donation)
    }
}

module.exports = DonationService;