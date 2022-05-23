// Setup empty JS object to act as endpoint for all routes.
projectData = {};

// Constants Declaration
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// App Initiation
const app = express();
// Using imported Modules by the app instance.
app.use(cors());
app.use(bodyParser.urlencoded(({ extended: false })));
app.use(bodyParser.json());
// Making the app aim for the folder containing the project files.
app.use(express.static('website'));

// """GET""" to return the endpoint for all routes.
app.get("/getProjectData", function (req, res) {
    res.send(projectData);
});
// """POST""" to add the returned values from the API to the endpoint.
app.post("/postProjectData", function (req, res) {
    projectData.temperature = req.body.main.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
});

// Server Initiation
const port = 8080;
const server = app.listen(8080, () => {
    console.log(`Running on ${port}`);
})
