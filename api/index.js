//Import the necessary libraries/declare the necessary objects
var app = require("express")()
var myParser = require("body-parser");


var dataFromCeligo;

app.use(myParser.json());
app.get("/", function(request, response) {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    response.send("Hello this is Home")
});
app.post("/api/test/source-data", function(request, response) {
    dataFromCeligo = request.body
     console.log(dataFromCeligo); //This prints the JSON document received (if it is a JSON document)
     response.send(dataFromCeligo)

});
app.post("/api/test/source-data", function(request, response) {
    dataFromCeligo = request.body
    //run CeligoAPI with id
    //record jobId
    //wait until jobId is finished
    //

});

module.exports = app;
//app.listen(80);