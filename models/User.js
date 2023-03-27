const db = require('../database/dbConnect.js');

class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address;
        this.phone_number = user.phone_number;
        this.date_of_birth = user.date_of_birth;
    }

    static async showUserByEmail(email) {
        const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);

        if(result.rows.length != 1) {
            return false;
        }
        return result.rows[0];
    }

    static async showUserByUsername(username) {
        const result = await db.query("SELECT * FROM users WHERE username = $1;", [username]);
        return result.rows[0];
    }

    static async create(newUser) {
        const { username, name, email, address, phone, dob, hashedPassword } = newUser;

        const result = await db.query("INSERT INTO users (username, name, email, password, address, phone_number, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [username, name, email, hashedPassword, address, phone, dob]);
        return result.rows[0];
    }


}

module.exports = User;
