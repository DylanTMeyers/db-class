\c postgres
DROP DATABASE IF EXISTS restaurants;
CREATE DATABASE restaurants;
\c restaurants;
create table types(
	  types Text
	, id SERIAL PRIMARY KEY
);

CREATE TABLE rest(	
 name Text
, zip integer
, id SERIAL PRIMARY KEY
, typesID integer
, FOREIGN KEY (typesID) REFERENCES types(id)
, city Text
, state Text
, dollars Text
);

create table Match(
  id serial primary Key
, restMatchID integer not null
, reviewer Text
, rating integer not null
, review Text
, restName Text
, dates date
, FOREIGN KEY (restMatchID) REFERENCES rest(id)
);
