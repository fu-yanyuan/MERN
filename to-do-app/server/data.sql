CREATE DATABASE todoapp;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

INSERT INTO todos(id, user_email, title, progress, date) VALUES ('0', 'fu@rakut3n.com', 'Asakai', 10, '20240425');
INSERT INTO todos(id, user_email, title, progress, date) VALUES ('0', 'fu@rakut3n.com', 'Lunch', 5, '20240426');