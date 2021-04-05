\c postgres
 DROP DATABASE IF EXISTS workshop;
CREATE DATABASE workshop;
\c workshop

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT,
	username TEXT,
	email TEXT
);
CREATE TABLE workshop (
	id SERIAL PRIMARY KEY,
	title TEXT,
	date date,
	location TEXT,
	maxseats INT,
	instructor TEXT
);
CREATE TABLE enroll (
	 usersid INTEGER NOT NULL,
	 workshopid INTEGER NOT NULL,
	 PRIMARY KEY (usersid, workshopid),
	 FOREIGN KEY (usersid) REFERENCES users(id),
	 FOREIGN KEY (workshopid) REFERENCES workshop(id)
);

