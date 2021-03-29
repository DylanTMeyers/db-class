require('dotenv').config()

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
	database: "workshop"
};

const pool = new Pool(config);

app.post("/create-user", async (req, res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const username = req.body.username;
	const email = req.body.email;
	try {
		const template1 = "SELECT * FROM users WHERE username = $1";
		const check = await pool.query(template1, [username]);
		console.log(check.rowCount);
		if (check.rowCount != 0){
			res.json({status: "username taken"});
		}
		else {
			// else let's insert it
			const template2 = "INSERT INTO users (firstname, lastname, username, email) VALUES ($1, $2, $3, $4)"
			const response = await pool.query(template2, [firstname, lastname, username, email]);
			res.json({status: "user added"});
		}
	} catch (err){
		// whoops
		console.log(err);
	}
	//
});
app.delete("/delete-user", async (req,res) =>{

	const username = req.body.username;
	const template2 = "DELETE FROM users where username = $1"
	const response = await pool.query(template2, [username]);
	res.json({status: "deleted"});
});


app.get("/list-users",async (req, res) => {
	const type = req.query.type;
	try {
		if(type == "full"){
			const template = "SELECT * FROM users";
			const response = await pool.query(template); 
			res.json({users: response.rows});
		}
		else if(type == "summary"){
			const template = "SELECT firstname, lastname FROM users";
			const response = await pool.query(template);
			res.json({users: response.rows});

		}
	} catch (err){
		console.log(err);
	}
});




app.post("/add-workshop", async (req, res) => {
	const title = req.body.title;
	const date = req.body.date;
	const location = req.body.location;
	const maxseats = req.body.maxseats;
	const instructor = req.body.instructor;
	try {
		const template1 = "SELECT * FROM workshop WHERE title = $1 AND date = $2 AND location = $3 AND maxseats = $4 AND instructor = $5";
		const check = await pool.query(template1, [title, date, location, maxseats, instructor]);
		console.log(check.rowCount);
		if (check.rowCount != 0){
			res.json({status: "workshop already in database"});
		}
		else {
			// else let's insert it
			const template2 = "INSERT INTO workshop (title, date, location, maxseats, instructor) VALUES ($1, $2, $3, $4, $5)"
			const response = await pool.query(template2, [title, date, location, maxseats, instructor]);
			res.json({status: "workshop added"});
		}
	} catch (err){
		// whoops
		console.log(err);
	}
	//
});






app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
	// eslint-disable-line no-console
});
