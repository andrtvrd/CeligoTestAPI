//Import the necessary libraries/declare the necessary objects
var app = require("express")()
var myParser = require("body-parser");
var request = require("request")
var dataFromCeligo;
var flowId = "";

app.use(myParser.json());
app.get("/", function(request, response) {
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
app.post(`/flows/${flowId}/run`, function(request, response) {
    idOfRecordCreated = request.body
    console.log(flowId)
    let celigoResponse = request.post({
        url: `https://api.integrator.io/v1/flows/${flowId}/run`,
        json: true,
        auth: {
            bearer: '716451a806e4454abfba9fcf8959c324'
          }
    })
    console.log(celigoResponse)

});

//module.exports = app;
app.listen(80);

    //run CeligoAPI with id
    //record jobId
    //wait until jobId is finished
    //