require("dotenv").config();
const db = require("../database/dbConnect.js");
const request = require("supertest");
const { Pool } = require("pg");
// const app = require('../server.js');

describe("Library API Server", () => {
  let app;
  let testClient;

  beforeAll(async () => {
    testClient = new Pool({
      connectionString: process.env.DB_URL,
      max: 1,
      idleTimeoutMillis: 0,
    });

    db.query = (text, values) => {
      return testClient.query(text, values);
    };

    app = require("../server.js");
  });

  beforeEach(async () => {
    await testClient.query(
      "CREATE TEMPORARY TABLE books (LIKE books INCLUDING ALL)"
    );
    await testClient.query(
      "CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"
    );
    await testClient.query(
      "CREATE TEMPORARY TABLE loans (LIKE loans INCLUDING ALL)"
    );
    await testClient.query(
      "CREATE TEMPORARY TABLE local_attractions (LIKE local_attractions INCLUDING ALL)"
    );
    await testClient.query(
      "CREATE TEMPORARY TABLE recycling_items (LIKE recycling_items INCLUDING ALL)"
    );
  });

  afterEach(async () => {
    await testClient.query("DROP TABLE IF EXISTS pg_temp.users");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.books");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.loans");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.local_attractions");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.recycling_items");
  });

  describe("BookService", () => {
    describe("ShowAll", () => {
      it("Given existing books, return books", async () => {
        let systemUnderTest = require("../models/Book.js");
        await givenBooksExist();

        const res = await systemUnderTest.showAll();

        expect(res.length).toBe(2);
      });

      it("Given no books, return empty array", async () => {
        let systemUnderTest = require("../models/Book.js");
        await givenNoBooksExist();

        const res = await systemUnderTest.showAll();

        expect(res.length).toBe(0);
      });

      // TODO : Include a test on showAll, where the book is lent and shouldn't come on the result.
    });

    describe("Show", () => {
      it("GIVEN list of books WHEN existing book retrieved THEN book is mapped correctly", async () => {
        let systemUnderTest = require("../models/Book.js");
        await givenBooksExist();

        const res = await systemUnderTest.show("Random Book");

        expect(res.length).toBe(1);

        let fetchedBook = res[0];
        expect(fetchedBook.title).toBe("Random Book");
        expect(fetchedBook.author).toBe("Test User 1");
        expect(fetchedBook.year).toBe("1956");
      });

      it("GIVEN list of books WHEN non-existing book retrieved THEN no items are returned", async () => {
        let systemUnderTest = require("../models/Book.js");
        await givenBooksExist();

        const res = await systemUnderTest.show("Non existing book");

        expect(res.length).toBe(0);
      });
    });
  });

  describe("LoanService", () => {
    describe("showAll", () => {
      // BDD - Behaviour driven design
      it("GIVEN no books lent WHEN fetching all loans THEN no items are returned", async () => {
        let systemUnderTest = require("../models/Loan.js");
        await givenNoLoans();

        const res = await systemUnderTest.showAll(1);

        expect(res.length).toBe(0);
      });

      it("GIVEN books lent WHEN fetching all loans THEN loans are returned", async () => {
        let systemUnderTest = require("../models/Loan.js");
        await givenUsers();
        await givenBooksExist();
        await givenLoans();

        const res = await systemUnderTest.showAll(1);

        expect(res.length).toBe(1);
      });

      it("GIVEN books lent WHEN fetching all loans for user without loans THEN no items are returned", async () => {
        let systemUnderTest = require("../models/Loan.js");
        await givenUsers();
        await givenBooksExist();
        await givenLoans();

        const res = await systemUnderTest.showAll(2);

        expect(res.length).toBe(0);
      });
    });

    describe("create", () => {
      it("GIVEN books to be lent WHEN borrowing a book THEN book is reserved", async () => {
        let systemUnderTest = require("../models/Loan.js");
        await givenUsers();
        await givenBooksExist();

        const res = await systemUnderTest.create(1, 1);

        expect(res.length).toBe(1);

        let bookBorrowed = res[0];
        expect(bookBorrowed.complete).toBe(false);
        expect(bookBorrowed.user_id).toBe(1);
      });

      it("GIVEN books to be lent WHEN borrowing an unexisting book THEN book is not reserved", async () => {
        let systemUnderTest = require("../models/Loan.js");
        await givenUsers();
        await givenBooksExist();

        const res = await systemUnderTest.create(1, 10000);

        expect(res.length).toBe(1);
        
        // TODO : Test is failing (shouldn't create the loan for an unexisting book)
        let bookBorrowed = res[0];
        expect(bookBorrowed.complete).toBe(false);
        expect(bookBorrowed.user_id).toBe(1);
        expect(bookBorrowed.book_id).toBe(1);
      });
    });
  });

  describe("/recycling", () => {
    it("Returns empty collection if no items for donation are registered.", async () => {
      const res = await request(app).get("/recycling/donations");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it("Returns collection of registered items for donation.", async () => {
      givenRecyclingItemExists();
      const res = await request(app).get("/recycling/donations");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("Successfully update item's donated status.", async () => {
      givenRecyclingItemExists();

      const patchRes = await request(app).patch("/recycling/donations/1");

      expect(patchRes.statusCode).toBe(200);
      expect(patchRes.body.updated[0].donated).toBe(true);
    });
  });

  async function givenBooksExist() {
    await testClient.query(
      "INSERT INTO pg_temp.books (title, author, year) VALUES ('Random Book', 'Test User 1', '1956'), ('Random book 2', 'Test User 2', '1954')"
    );
  }

  async function givenNoBooksExist() {
    await testClient.query("DELETE FROM pg_temp.books");
  }

  async function givenUsers() {
    await testClient.query(
      "INSERT INTO pg_temp.users (username, name, email, password, address, phone_number, date_of_birth) VALUES ('new_use','John Do','john.doe@email.com', 'p4ssw0r', '23 High Street', '01234567891', '1990-01-01')"
    );
  }

  async function givenLoans() {
    await testClient.query(
      "INSERT INTO pg_temp.loans (book_id, user_id, loan_date) VALUES (1, 1, '2023-03-27')"
    );
  }

  async function givenNoLoans() {
    await testClient.query("DELETE FROM pg_temp.loans");
  }

  async function givenAttractionsExist() {
    await testClient.query(
      "INSERT INTO pg_temp.local_attractions (name, description, location_url) VALUES ('Rock Park', 'This is the perfect destination for families looking to spend a fun-filled day outdoors. Our park features a stunning lake with crystal clear waters, surrounded by lush greenery and breathtaking views. There''s something for everyone here - you can enjoy a picnic by the lake, go for a relaxing stroll around the water, or even take a dip and cool off on a hot day. For those seeking adventure, we offer a variety of exciting water activities such as kayaking, paddleboarding, and fishing. If you''re looking for something a little more laid back, our park also has plenty of space for games and sports, as well as playgrounds for children to explore and play. And when hunger strikes, our on-site restaurant offers delicious meals and snacks for the whole family to enjoy. Come visit us and make unforgettable memories in our wonderful Rock Park with a beautiful lake!','https://d-art.ppstatic.pl/kadry/k/r/b4/40/53fed46670a7e_o_full.jpg')"
    );
  }

  async function givenRecyclingItemExists() {
    await testClient.query(
      "INSERT INTO pg_temp.recycling_items (title, description, date, condition, picture_url) VALUES ('Harry Potter Box Set', 'This box includes a collection of all seven books in the Harry Potter series written by J.K. Rowling. The set is perfect for fans of all ages and includes the beloved stories of the wizarding world, featuring the adventures of Harry, Ron, and Hermione. This set is in perfect condition and is opportunity for anyone who loves fantasy, magic, and adventure.', '2023-03-28', 'used', 'https://i.ebayimg.com/images/g/d9IAAOSw4-xkDwSB/s-l1600.jpg')"
    );
  }
});
