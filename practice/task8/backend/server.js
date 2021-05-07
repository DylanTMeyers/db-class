const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const client = require("./docker-elk/campgrounds.js");
app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let lols = [];

app.get("/api/retrieve", async (req, res) => {
	const name = req.query.des;
	console.log(name);
	let lol = await client.camps(name);
	               lol.map((no) =>{
			  lols.push(no);               
			                       });
	res.json(lol);
});
app.get("/api/re", async (req, res) => {
	const id = req.query.id;
	
	        lols.map((no) =>{
			if(no._id == id){	
			res.json(no);
			}
		});
});




app.listen(app.get("port"), () => {
	  console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
