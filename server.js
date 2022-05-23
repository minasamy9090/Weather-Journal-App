// Setup empty JS object to act as endpoint for all routes
projectData = {};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded(({ extended: false })));
app.use(bodyParser.json());

app.use(express.static('website'));
/////

app.get("/getProjectData", function (req, res) {
    res.send(projectData);
});

app.post("/postProjectData", function (req, res) {
    projectData.temperature = req.body.main.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
});
/////
const port = 8080;
const server = app.listen(8080, () => {
    console.log(`Running on ${port}`);
})
