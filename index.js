const express = require("express");
const app = express();

app.use(express.static(__dirname + ''))

app.listen(3000, function(){
    console.log("App is running on port 3000");
});

app.get("/", function(req, res){
	res.sendFile("index.html", { root: __dirname });
});
