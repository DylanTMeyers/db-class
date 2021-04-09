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
			const template2 = "INSERT INTO users (firstname, lastname, username, email) VALUES ($1, $2, $3, $4)";
			const response = await pool.query(template2, [firstname, lastname, username, email]);
			res.json({status: "user added"});
		}
	} catch (err){
		// whoops
		console.log(err);
	}
	//
});
app.delete('/delete-user', async (req, res) => {
        const usern = req.body.username;
                        const template2 = "Delete from users where username = $1";
                        const response = await pool.query(template2, [usern]);
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
app.post("/enroll", async (req, res) => {
	const title = req.body.title;
	const date = req.body.date;
	const location = req.body.location;
	const maxseats = req.body.maxseats;
	const instructor = req.body.instructor;
	const username = req.body.username;

	try {
		const template1 = "SELECT id FROM workshop WHERE title = $1 AND date = $2 AND location = $3 AND maxseats = $4 AND instructor = $5";
		const check1 = await pool.query(template1, [title, date, location, maxseats, instructor]);
		if (check1.rows[0] == undefined){
			res.json({status: "workshop does not exist"});

		}else{
			const template2 = "SELECT id FROM users WHERE username = $1";
			const check2 = await pool.query(template2, [username]);

			const template3 = "SELECT * FROM enroll WHERE usersid = $1 AND workshopid = $2";

			const check3 = await pool.query(template3, [check2.rows[0].id, check1.rows[0].id]);


			const template5 = "SELECT * FROM enroll WHERE workshopid = $1";

			const check5 = await pool.query(template5, [check1.rows[0].id]);
			if(maxseats == check5.rowCount){
				res.json({status: "no seats available"});
			}else{
				console.log(check2.rows);
				if (check3.rowCount != 0){
					res.json({status: "user already enrolled"});
				}
				else {
					console.log(check2.rows[0].id);
					// else let's insert it
					const template4 = "INSERT INTO enroll (usersid, workshopid) VALUES ($1, $2)"
					const response = await pool.query(template4, [check2.rows[0].id, check1.rows[0].id]);
					res.json({status: "user added"});
				}
			}
		}
	} catch (err){
		// whoops
		console.log(err);
	}
	//
});
app.get("/list-workshops",async (req, res) => {
	try{
		const template = "SELECT title, date, location FROM workshop";
		const response = await pool.query(template);
		for(let i =0; i<response.rowCount; i++){
			response.rows[i].date = dateFormat(response.rows[i].date, "yyyy-mm-dd");
		}
		res.json({workshops:response.rows } );



	} catch (err){
		console.log(err);
	}
});
app.get("/attendees",async (req, res) => {
	try{
		        const title = req.query.title;
		        const date = req.query.date;
		        const location = req.query.location;   
		const template1 = "Select * from workshop where location = $1 AND date = $2 AND title = $3";
		const response1 = await pool.query(template1,[location, date, title]);

		if(response1.rowCount == 0){
		res.json({error: "workshop does not exist"});
		}
		else{
		const template = "SELECT users.firstname, users.lastname FROM users JOIN enroll on users.id = enroll.usersid join workshop on enroll.workshopid = workshop.id WHERE workshop.location = $1 AND workshop.date = $2 AND workshop.title = $3"; 
		const response = await pool.query(template,[location, date, title]);
		res.json({attendees:response.rows } );
		}
	} catch (err){
		console.log(err);
	}
});
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
	// eslint-disable-line no-console
});

