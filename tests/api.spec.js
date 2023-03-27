require('dotenv').config();
const db = require('../database/dbConnect.js');
const request = require('supertest');
const { Pool } = require('pg');
// const app = require('../server.js');

describe("Libray API Server", () => {
    let app;

    beforeAll(async () => {
        const newPool = new Pool({connectionString: process.env.DB_URL})
        db.query = (text, values) => {
            return newPool.query(text, values)
        }
        app = require('../server.js');
    })

    beforeEach(async () => {
        await db.query('CREATE TEMPORARY TABLE books (LIKE books INCLUDING ALL)')
        await db.query('CREATE TEMPORARY TABLE loans (LIKE loans INCLUDING ALL)')

    })

    afterEach(async () => {
        await db.query('DROP TABLE IF EXISTS pg_temp.books')
        await db.query('DROP TABLE IF EXISTS pg_temp.loans')
    })

    describe('/library', () => {
        describe('GET', () => {
            it('Returns a collection of books.', async () => {
                const res = await request(app).get('/library')
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toBe(53)
            })
        })
    })
})