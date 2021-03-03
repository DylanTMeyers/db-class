require('dotenv').config();
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
	database: "workshop1"
};

const pool = new Pool(config);

app.get('/hello', (req, res) => {
	// console log the request query json object
	// console log the person parameter
	// now send a response back to the client
	res.json({response: `Hello, ${req.query.person}`});
});





app.post("/api", async (req, res) => {
	const workshop = req.body.workshop;
	const attendee = req.body.attendee;
	try {

		const template1 = "SELECT * FROM workshops WHERE workshop = $1 AND attendee = $2";
		const check = await pool.query(template1,[workshop,attendee]);

		if (check.rowCount != 0){
			res.json({error:'attendee already enrolled'});
		}
		else {
			// else let's insert it
			const template2 = "INSERT INTO workshops (workshop, attendee) VALUES ($1, $2)";
			const response = await pool.query(template2, [workshop, attendee]);

			res.json({workshop:  `${workshop}`,attendee: `${attendee}`}); 
		}
	} catch (err){
		// whoops
		console.log(err);
		}

});




	//	 app.get("/api", async (req, res) => {
		
	
	//	const template = "SELECT workshop FROM workshops";
	//	const response = await pool.query(template);
	//	const results = response.rows.map((row) => {return (row.workshop)})
	//	res.json({workshops:results});
	//	});



                      
		app.get("/api",async (req, res) => {
		const workshop = req.query.workshop;
		if(workshop == null){
		              const template = "SELECT DISTINCT workshop FROM workshops";
			      const response = await pool.query(template);
			      const results = response.rows.map((row) => {return (row.workshop)})
			      res.json({workshops:results});
		}else{
		try {
			const template = "SELECT attendee FROM workshops WHERE workshop = $1";
			const response = await pool.query(template, [workshop]);
			if(response.rowCount == 0){
			res.json({error: "workshop not found"});
			}else{
			const results = response.rows.map((row) => {return (row.attendee)})
			res.json({attendees: results});
			}
		} catch (err){
			console.log(err);
		}}
		});

app.listen(app.get("port"), () => {
		console.log(`Find the server at http://localhost:${app.get("port")}`);
		 // eslint-disable-line no-console
 });
