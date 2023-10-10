//Import the necessary libraries/declare the necessary objects
var app = require("express")()
var myParser = require("body-parser");
var req = require("request")
var dataFromCeligo;
var flowId = "";

const bearerToken = "716451a806e4454abfba9fcf8959c324"
let celigoResponse
let jobId

app.use(myParser.json());
app.get('/', function(request, response) {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    response.send("Hello this is Home")
});
//get and return test record that would be used
app.post("/api/test/source-data", function(request, response) {
    dataFromCeligo = request.body
    response.send(dataFromCeligo)

});
//get id of record created in system 1 and run a flow under Test
// flow id for tests - 6511e24f876889750ba5f674
app.post('/api/flows/6511e24f876889750ba5f674/run', function(request, response) {
    idOfRecordCreated = request.body
    console.log(idOfRecordCreated)
    req({
        method: 'POST',
        uri: 'https://api.integrator.io/v1/flows/6511e24f876889750ba5f674/run',
        json: true,
        auth: {
            bearer: bearerToken
          }
    },
        function (error, resp, body) {
            celigoResponse = resp
            jobId = body
            console.log(jobId)
            response.send(jobId)
        }
    )
});

app.post('/api/test_delay', function(request, response) {
    setTimeout((() => {
        response.send('Hello this is Home');
      }), 60000)
});

module.exports = app;
//app.listen(80);

    //run CeligoAPI with id
    //record jobId
    //wait until jobId is finished
    //