require('dotenv').config()
var dateFormat = require('dateformat');

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: "restaurants"
};

const pool = new Pool(config);

app.post("/restaurant", async (req, res) => {
	const name = req.body.name;
	const city = req.body.city;
	const state = req.body.state;
	const zip = req.body.zip;
	const type = req.body.type;
	const dollars = req.body.dollars;
	
	try {
		 
		const template1 = "SELECT * FROM rest WHERE name = $1 and zip = $2";
		const check = await pool.query(template1, [name, zip]);
		if (check.rowCount != 0){
			res.json({status: "Restaurant already exists"});
		}
		else {
			const template2 = "Select * from types where types = $1";
			const check2 = await pool.query(template2, [type]);
			if (check2.rowCount == 0){
				
				const template3 = "INSERT INTO types (types) VALUES ($1)";
				const response = await pool.query(template3, [type]);
					
			}
			  const template6 = "Select * from types where types = $1";
			const check5 = await pool.query(template6, [type]);
			// else let's insert it
			const template4 = "INSERT INTO rest (name, zip, typesID, city, state, dollars) VALUES ($1, $2, $3, $4, $5, $6)";
			const check6 = await pool.query(template4, [name, zip, check5.rows[0].id, city, state, dollars]);
	res.json({status: "OK"});
		}
	}
		
	 catch (err){
		// whoops
		console.log(err);
	}
	
	 
});

app.post("/review", async (req, res) => {
	const name = req.body.name;
	const zip = req.body.zip;
	const reviewer = req.body.reviewer;
	const rating = req.body.rating;
	const review = req.body.review;
	var today = new Date();
	const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	try {
		const template1 = "SELECT * FROM rest WHERE name = $1 and zip = $2";
		const check = await pool.query(template1, [name, zip]);
		const select = "select * from rest";
	
		if (check.rowCount == 0){
			res.json({status: "Restaurant does not exist"});
		}
		else {
			// else let's insert it
			const template2 = "INSERT INTO Match (restMatchID, reviewer, rating, review, restName, dates) VALUES ($1, $2, $3, $4, $5, $6)";
			const response = await pool.query(template2, [check.rows[0].id, reviewer, rating, review, name,  dateFormat(date, "yyyy-mm-dd")]);
			res.json({status: "OK"});
		}
	} catch (err){                                                                                                  // whoops
		console.log(err);                                                                               }

});
app.get("/restaurant", async (req, res) => {
	const name = req.query.name;
	const zip = req.query.zip;

	const template1 = "SELECT ROUND(AVG(Match.rating),2) as stars, COUNT(Match.review) as reviews, rest.name as name, rest.city as city, rest.state as state, rest.zip as zip, rest.dollars as dollars, types.types as type FROM Match join rest on rest.id = Match.restMatchID join types on types.id = rest.typesID WHERE name = $1 and zip = $2 group by rest.name, rest.city, rest.state, rest.zip, rest.dollars, types.types";
	const check = await pool.query(template1, [name, zip]);
	res.json({ status: "OK", result:check.rows[0]});

});
app.get("/reviews", async (req, res) => {
	const name = req.query.name;
	const zip = req.query.zip;
	const template1 = "SELECT Match.reviewer as reviewer, Match.dates as review_date, ROUND(Match.rating, 2) as stars, Match.review as review from Match join rest on rest.id = Match.restMatchID where name = $1 and zip = $2";
	const check = await pool.query(template1, [name, zip]);
	                for(let i =0; i<check.rowCount; i++){
		check.rows[i].date = dateFormat(check.rows[i].review_date, "yyyy-mm-dd");
				                }
	res.json({ status: "OK", result:check.rows});

});
app.get("/find", async (req, res) => {
	const type = req.query.type;
	const template2 = "SELECT types.types from types where types.types = $1"
	  const check2 = await pool.query(template2, [type]);
	
	const template1 = `SELECT rest.name as restaurant, ROUND(AVG(Match.rating), 2) as rating, COUNT(Match.review) as reviews, rest.dollars as dollars, rest.city as city, rest.state as state, rest.zip as zip from Match join rest on rest.id = Match.restMatchID join types on types.id = typesID where types.types like '%${type}%' group by rest.name, rest.dollars, rest.city, rest.state, rest.zip order by rating desc`;
	const check = await pool.query(template1);
	res.json({ status: "OK", result:check.rows});
});
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
	// eslint-disable-line no-console
});
