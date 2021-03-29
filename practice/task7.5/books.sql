\c postgres
DROP DATABASE IF EXISTS book;
CREATE DATABASE book;
\c book;

CREATE TABLE books(
	
	  isbn varchar(20) NOT NULL
	, title VARCHAR(45)
	, format VARCHAR(25)
	, price decimal
	, pages integer
	, publisher varchar(20)
	, pubDate date
	, pubHQ varchar(20)
	, id SERIAL PRIMARY KEY
);

INSERT INTO books (id, isbn, title, format, price, pages, publisher, pubDate, pubHQ) VALUES (1, '030788743X', 'Ready Player One', 'hardcover', 18.69, 384, 'Ballantine', '2011-09-16',  'New York, NY' );
INSERT INTO books (id, isbn ,title, format, price, pages, publisher, pubDate, pubHQ) VALUES (2, '1524761338', 'Ready Player Two', 'hardcover', 13.18, 384, 'Ballantine', '2020-11-24',  'New York, NY' );
INSERT INTO books (id, isbn ,title, format, price, pages, publisher, pubDate, pubHQ) VALUES (3, '0062409166', 'The Rise and Fall of D.O.D.O.: A Novel', 'hardcover', 4.28, 768, 'William Morrow', '2017-06-13',  'New York, NY' );
INSERT INTO books (id, isbn ,title, format, price, pages, publisher, pubDate, pubHQ) VALUES (4, '0062409158', 'The Rise and Fall of D.O.D.O.: A Novel', 'paperback', 4.28, 768, 'William Morrow', '2017-06-13',  'New York, NY' );
INSERT INTO books (id, isbn ,title, format, price, pages, publisher, pubDate, pubHQ) VALUES (5, '0553380958', 'Snow Crash', 'paperback', 9.99, 440, 'Del Ray', '2000-01-01',   'New York, NY'  );




CREATE TABLE author(

	 author VARCHAR(30)
	, authRes varchar(40)
	, authBirth date
	, id SERIAL PRIMARY KEY
);
INSERT INTO author (id , author, authRes, authBirth) VALUES (1, 'Ernest Cline', 'Austin TX', '1972-03-29');
INSERT INTO author (id , author, authRes, authBirth) VALUES (2, 'Neal Stephenson', 'Seattle WA', '1959-10-31');
INSERT INTO author (id , author, authRes, authBirth) VALUES (3, 'Nicole Galland', 'Martha''s Vineyard MA', '1965-10-31');
create table match(
 authorid integer not null
, bookid integer not null
, primary key (authorid, bookid)
, FOREIGN KEY (authorid) REFERENCES author(id)
, FOREIGN KEY (bookid) REFERENCES books(id)
);
CREATE INDEX match_book ON match(bookid);
CREATE INDEX match_author ON match(authorid);



INSERT INTO match VALUES (1, 1 );
INSERT INTO match VALUES (1, 2 );
INSERT INTO match VALUES (2, 3 );
INSERT INTO match VALUES (2, 4 );
INSERT INTO match VALUES (2, 5 );
INSERT INTO match VALUES (3, 3 );
INSERT INTO match VALUES (3, 4 );

