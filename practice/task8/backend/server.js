const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const client = require("./docker-elk/campgrounds.js");
app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/api/retrieve", async (req, res) => {
	const name = req.query.des;
	console.log(name);
	const lol = await client.camps(name);
	res.json(lol);
});



app.listen(app.get("port"), () => {
	  console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
