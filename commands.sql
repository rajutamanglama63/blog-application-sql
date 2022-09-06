CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
)

insert into blogs (author, url, title) values ('Ram', 'url.com', 'universe');
insert into blogs (author, url, title) values ('Shyam','star.com', 'star');

SELECT * FROM blogs