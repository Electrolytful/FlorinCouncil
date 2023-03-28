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
  });

  afterEach(async () => {
    await testClient.query("DROP TABLE IF EXISTS pg_temp.users");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.books");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.loans");
    await testClient.query("DROP TABLE IF EXISTS pg_temp.local_attractions");
  });

  describe("/library", () => {
    it("Returns empty collection if no books are registered.", async () => {
      givenNoBooksExist();

      const res = await request(app).get("/library");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it("Returns a collection of books.", async () => {
      givenBooksExist();

      const res = await request(app).get("/library");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("Returns only available books if loans are made.", async () => {
      givenBooksExist();
      givenUsers();
      givenLoans();

      const res = await request(app).get("/library");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("Returns information of specific book.", async () => {
      givenBooksExist();
      const res = await request(app).get("/library/The Lord of the Rings");
      expect(res.statusCode).toBe(200);
      expect(res.body[0].author).toBe("J.R.R. Tolkien");
      expect(res.body[0].title).toBe("The Lord of the Rings");
      expect(res.body[0].year).toBe("1955");
    });

    it("Returns 404 status code if specific book does not exist.", async () => {
      givenBooksExist();
      const res = await request(app).get("/library/Foundation");
      expect(res.statusCode).toBe(404);
      expect(res.body.length).toBe(0);
    });

    it("Returns a collection of loans by user.", async () => {
      givenBooksExist();
      givenUsers();
      givenLoans();
      const res = await request(app)
        .get("/library/mybooks")
        .set({ "user-id": "1" });

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("Successfully creates a loan.", async () => {
      givenBooksExist();
      givenUsers();
      const service = {
        user_id: 1,
        book_id: 1,
        date: "2023-03-28",
      };
      const res = await request(app).post("/library/1").send(service);
      expect(res.statusCode).toBe(201);
      expect(res.body.created[0].user_id).toBe(1);
      expect(res.body.created[0].book_id).toBe(1);
    });

    it("Sucessfully completes a loan.", async () => {
      givenBooksExist();
      givenUsers();
      const service = {
        user_id: 1,
        book_id: 1,
        date: "2023-03-28",
      };
      const postRes = await request(app).post("/library/1").send(service);

      const patchRes = await request(app).patch("/library/1");

      expect(patchRes.statusCode).toBe(200);
      expect(patchRes.body.updated[0].complete).toBe(true);
    });
  });

  describe("/visit", () => {
    it("Returns empty collection if no local attractions are registered.", async () => {
      const res = await request(app).get("/visit");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it("Returns collection of registered local attractions.", async () => {
      givenAttractionsExist();
      const res = await request(app).get("/visit");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  async function givenBooksExist() {
    await testClient.query(
      "INSERT INTO pg_temp.books (title, author, year) VALUES ('The Lord of the Rings', 'J.R.R. Tolkien', '1955'), ('The Fellowship of the Ring', 'J.R.R. Tolkien', '1954')"
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
      "INSERT INTO pg_temp.loans (book_id, user_id, loan_date, complete) VALUES (1, 1, '2023-03-27', false)"
    );
  }

  async function givenAttractionsExist() {
    await testClient.query(
      "INSERT INTO pg_temp.local_attractions (name, description, location_url) VALUES ('Rock Park', 'This is the perfect destination for families looking to spend a fun-filled day outdoors. Our park features a stunning lake with crystal clear waters, surrounded by lush greenery and breathtaking views. There''s something for everyone here - you can enjoy a picnic by the lake, go for a relaxing stroll around the water, or even take a dip and cool off on a hot day. For those seeking adventure, we offer a variety of exciting water activities such as kayaking, paddleboarding, and fishing. If you''re looking for something a little more laid back, our park also has plenty of space for games and sports, as well as playgrounds for children to explore and play. And when hunger strikes, our on-site restaurant offers delicious meals and snacks for the whole family to enjoy. Come visit us and make unforgettable memories in our wonderful Rock Park with a beautiful lake!','https://d-art.ppstatic.pl/kadry/k/r/b4/40/53fed46670a7e_o_full.jpg')"
    );
  }
});
