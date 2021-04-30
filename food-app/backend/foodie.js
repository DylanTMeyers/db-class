require('dotenv').config()
var dateFormat = require('dateformat');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const Pool = require("pg").Pool;
const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: "food_nutrition"
};

const pool = new Pool(config);

app.get("/foo/food",async (req, res) => {
	try{
		let lol = [];
		
		const input = req.query.input;
		const template = `Select description, kcal, protein_g, carbohydrate_g, ROUND(CAST(fa_sat_g + fa_mono_g+fa_poly_g AS DECIMAL(7,2)),2) as FAT from entries where description ILIKE '%${input}%'`;
		const response = await pool.query(template);
		
		if(input != ""){
		lol = response.rows.map(function(value){
		if(value.fat == null){
		value.fat = 0.0;
		}
		return value;
		});
		}
		res.json(lol);
		
	} catch (err){
		console.log(err);
	}
});
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
	// eslint-disable-line no-console
});

