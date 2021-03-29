\c postgres
DROP DATABASE IF EXISTS logger;
CREATE DATABASE logger;
\c logger

CREATE TABLE users (
	username TEXT PRIMARY KEY,
	password TEXT,
	screenname TEXT
	                        );
