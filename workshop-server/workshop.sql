\c postgres
DROP DATABASE IF EXISTS workshop1;
CREATE DATABASE workshop1;
\c workshop1

CREATE TABLE workshops (
id SERIAL PRIMARY KEY,
workshop TEXT,
attendee TEXT
			);





