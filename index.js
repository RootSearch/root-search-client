const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())

app.use(express.static(__dirname + ''))

app.listen(3000, function(){
    console.log("App is running on port 3000");
});

app.get("/", function(req, res){
	res.sendFile("index.html", { root: __dirname });
});
