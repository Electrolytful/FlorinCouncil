DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS local_attractions;
DROP TABLE IF EXISTS recycling_items;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(155) NOT NULL,
    email VARCHAR(155) NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(155) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE books(
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(155) NOT NULL,
    year CHAR(4),
    PRIMARY KEY (id)
);

CREATE TABLE loans(
    id INT GENERATED ALWAYS AS IDENTITY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    loan_date DATE NOT NULL,
    complete BOOLEAN,
    PRIMARY KEY (id),
    CONSTRAINT kf_loans_books_bookid FOREIGN KEY (book_id) REFERENCES books (id),
    CONSTRAINT kf_loans_users_userid FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE local_attractions(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(155) NOT NULL, 
    description VARCHAR(1500) NOT NULL, 
    location_url VARCHAR(2048),
    PRIMARY KEY (id)
);

CREATE TABLE posts(
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
    contact_info VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT fk_posts_users_userid FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE recycling_items(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(155) NOT NULL,
    description VARCHAR(300) NOT NULL,
    date DATE NOT NULL,
    condition VARCHAR(50) NOT NULL,
    donated BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users
    (username, name, email, password, address, phone_number, date_of_birth)
VALUES
    ('test_user', 'John Doe', 'john.doe@email.com', 'p4ssw0rd', '123 High Street', '01234567891', '1990-01-01'),
    ('test_user00', 'Jane Doe', 'jane.doe@email.com', 'password', '123 High Street', '09876543210', '1990-01-01');

INSERT INTO books
    (title, author, year)
VALUES
    ('The Lord of the Rings', 'J.R.R. Tolkien', '1955'),
    ('The Fellowship of the Ring', 'J.R.R. Tolkien', '1954'),
    ('The Two Towers', 'J.R.R. Tolkien', '1954'),
    ('The Return of the King', 'J.R.R. Tolkien', '1955'),
    ('The Hobbit', 'J.R.R. Tolkien', '1937'),
    ('The Foundation Trilogy', 'Isaac Asimov', '1953'),
    ('Foundation', 'Isaac Asimov', '1951'),
    ('Foundation and Empire', 'Isaac Asimov', '1952'),
    ('Second Foundation', 'Isaac Asimov', '1953'),
    ('A Game of Thrones', 'George Martin', '1996'),
    ('A Clash of Kings', 'George Martin', '1998'),
    ('A Storm of Swords', 'George Martin', '2000'),
    ('A Feast for Crows', 'George Martin', '2005'),
    ('A Dance with Dragons', 'George Martin', '2011'),
    ('Sapiens', 'Yuval Noah Harari', '2011'),
    ('The Selfish Gene', 'Richard Dawkins', '1976'),
    ('The Silmarillion', 'George Martin', '1977'),
    ('Childhood''s End', 'Arthur C. Clarke', '1953'),
    ('1984', 'George Orwell', '1949'),
    ('Animal Farm', 'George Orwell', '1945'),
    ('Misery', 'Stephen King', '1987'),
    ('It', 'Stephen King', '1986'),
    ('Dracula', 'Bram Stoker', '1897'),
    ('Philosopher''s Stone', 'J.K. Rowling', '1997'),
    ('Chamber of Secrets', 'J.K. Rowling', '1998'),
    ('Prisoner of Azkaban', 'J.K. Rowling', '1999'),
    ('Goblet of Fire', 'J.K. Rowling', '2000'),
    ('Order of the Phoenix', 'J.K. Rowling', '2003'),
    ('Half-Blood Prince', 'J.K. Rowling', '2005'),
    ('Deathly Hallows', 'J.K. Rowling', '2007'),
    ('The Shining', 'J.K. Rowling', '1977'),
    ('To Kill a Mockingbird', 'Harper Lee', '1960'),
    ('Pride and Prejudice', 'Jane Austen', '1813'),
    ('The Catcher in the Rye', 'J.D. Salinger', '1951'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', '1925'),
    ('One Hundred Years of Solitude', 'Gabriel García Márquez', '1967'),
    ('The Diary of a Young Girl', 'Anne Frank', '1947'),
    ('Brave New World', 'Aldous Huxley', '1932'),
    ('Slaughterhouse-Five', 'Kurt Vonnegut', '1969'),
    ('The Picture of Dorian Gray', 'Oscar Wilde', '1890'),
    ('The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', '1979'),
    ('Frankenstein', 'Mary Shelley', '1818'),
    ('Wuthering Heights', 'Emily Bronte', '1847'),
    ('Jane Eyre', 'Charlotte Bronte', '1847'),
    ('The Adventures of Huckleberry Finn', 'Mark Twain', '1884'),
    ('Lord of the Flies', 'William Golding', '1954'),
    ('Crime and Punishment', 'Fyodor Dostoevsky', '1866'),
    ('The Grapes of Wrath', 'John Steinbeck', '1939'),
    ('The Canterbury Tales', 'Geoffrey Chaucer', '1387'),
    ('Heart of Darkness', 'Joseph Conrad', '1899'),
    ('Moby-Dick', 'Herman Melville', '1851'),
    ('The Scarlet Letter', 'Nathaniel Hawthorne', '1850'),
    ('The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', '1892');

INSERT INTO local_attractions
    (name, description, location_url)
VALUES
    ('Rock Park', 'This is the perfect destination for families looking to spend a fun-filled day outdoors. Our park features a stunning lake with crystal clear waters, surrounded by lush greenery and breathtaking views. There''s something for everyone here - you can enjoy a picnic by the lake, go for a relaxing stroll around the water, or even take a dip and cool off on a hot day. For those seeking adventure, we offer a variety of exciting water activities such as kayaking, paddleboarding, and fishing. If you''re looking for something a little more laid back, our park also has plenty of space for games and sports, as well as playgrounds for children to explore and play. And when hunger strikes, our on-site restaurant offers delicious meals and snacks for the whole family to enjoy. Come visit us and make unforgettable memories in our wonderful Rock Park with a beautiful lake!','https://d-art.ppstatic.pl/kadry/k/r/b4/40/53fed46670a7e_o_full.jpg'),
    ('Garden Ring', 'This tranquil oasis in the heart of the city is the perfect place for families to escape the hustle and bustle and enjoy some fresh air and greenery. Our garden boasts a wide variety of flora and fauna, from vibrant flowers and towering trees to chirping birds and buzzing insects. Take a leisurely stroll through our winding pathways and discover the many hidden nooks and crannies throughout the garden. For children, we offer a fun-filled play area with swings, slides, and climbing structures, as well as a designated area for picnics and outdoor games. And for those looking for a more educational experience, our garden also features informational signs and guided tours that offer insight into the many plants and animals that call this space home. Whether you''re looking to relax and unwind or explore and learn, our city garden is the perfect destination for families seeking an escape from the concrete jungle. We can''t wait to welcome you!', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.arrivalguides.com%2Fen%2FTravelguide%2FKrakow%2Fdoandsee%2Fplanty-park-79767&psig=AOvVaw3wwv_OU4Est-8AOJjrPWtX&ust=1679913882081000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNDKoYO1-f0CFQAAAAAdAAAAABAE'),
    ('The Garden Castle', 'This historic site offers a unique and exciting opportunity for families to step back in time and explore the remnants of a once-great castle. As you explore the ruins, you''ll discover the many nooks and crannies that once housed the castle''s inhabitants, from the grand halls and chambers to the winding staircases and towers. Our on-site guides are available to offer insight into the castle''s rich history and answer any questions you may have. For children, we offer a special "treasure hunt" activity where they can search for hidden clues and artifacts throughout the ruins, learning about the castle''s history along the way. And for those seeking a more adventurous experience, we offer guided hikes and nature walks through the surrounding forest and countryside. With stunning views and a rich history to discover, our castle ruins offer a truly unforgettable experience for families looking to immerse themselves in the past. We look forward to welcoming you and your loved ones to this historic site!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/20140619_Zamek_Ogrodzieniec_3673.jpg/1200px-20140619_Zamek_Ogrodzieniec_3673.jpg'),
    ('City Museum', 'Our museum offers a fascinating glimpse into the history, culture, and traditions of our community. As you explore our exhibits, you''ll discover artifacts and stories that showcase the unique heritage of our region. From interactive displays that bring history to life, to artwork and photographs that capture the essence of our community, our museum has something for everyone. Our knowledgeable staff are always on hand to answer questions and provide insight into the exhibits, and we offer a variety of educational programs and tours for visitors of all ages. Whether you''re a lifelong resident or a first-time visitor, our local museum offers a wonderful opportunity to learn and connect with the rich history and culture of our community. We look forward to welcoming you and sharing our stories with you.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuw3dq5jMytOWCz-_uNucTA2InKX4DOm48gA&usqp=CAU');
