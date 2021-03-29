\c postgres
DROP DATABASE IF EXISTS bootcamp;
CREATE DATABASE bootcamp;
\c bootcamp;

CREATE TABLE course(
	course VARCHAR(10)
	, title VARCHAR(30)
	, description text
	, id SERIAL PRIMARY KEY
);
INSERT INTO course (id, course ,title, description) VALUES (1, 'CS120', 'Javascript Fundamentals', 'This course is designed to provide a solid introduction to the JavaScript language. We will explore the more unique and tricky JavaScript features such as closures, higher-order functions,');
INSERT INTO course ( id, course ,title, description) VALUES (2, 'CS220', 'PostgreSQL', 'This course will teach you how to explore, modify, and export data from a database. You’ll be introduced to foundational concepts like tables, data types, and queries.');
INSERT INTO course (id, course ,title, description) VALUES (3, 'CS340', 'DevOps','We examine the definition and concepts around the ideas of DevOps. How do they relate to working in the cloud?');


create table teacher(
	instructor varchar(20)
	, instrEmail varchar(20)
	, id SERIAL PRIMARY KEY
);
insert into teacher(id, instructor, instrEmail) values(1, 'Becca Elenzil',  'elenzil@ada.org');
insert into teacher(id, instructor, instrEmail) values(2, 'Claire Elliot',  'elliot@ada.org');
insert into teacher(id, instructor, instrEmail) values(3, 'Kaida Masaki',  'kmas@ada.org');
CREATE TABLE class(

	courseid integer not null
	, teacherid integer not null
	, section integer
	, day varchar(2)
	, morn_after VARCHAR(15)
	, instructor varchar(20)
	, instrEmail varchar(20)
	, building varchar(15)
	, room varchar(3)
	, id SERIAL PRIMARY KEY
	, FOREIGN KEY (teacherid) REFERENCES teacher(id)
	, FOREIGN KEY (courseid) REFERENCES course(id)
);
INSERT INTO class (id, courseid, teacherid, section, day, morn_after, building, room) VALUES ( 1, 1, 1, 1, 'MW', 'morning', 'downtown', 'c12');
INSERT INTO class (id, courseid, teacherid, section, day, morn_after, building, room) VALUES ( 2, 1, 2, 2, 'MW', 'afternoon', 'downtown', 'c8');
INSERT INTO class (id, courseid, teacherid, section, day, morn_after, building, room) VALUES ( 3, 2, 1, 1, 'MW', 'morning', 'downtown', 'c12');
INSERT INTO class (id, courseid, teacherid,  section, day, morn_after, building, room) VALUES ( 4, 3, 3, 1, 'TT', 'afternoon',  'Nob Hill', 'nh1');
INSERT INTO class (id, courseid, teacherid, section, day, morn_after, building, room) VALUES ( 5, 3, 3, 2, 'MW', 'afternoon',  'downtown', 'c10');
