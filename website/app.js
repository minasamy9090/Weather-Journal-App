/* Global Variables */
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
// Personal API
const API = "&appid=6511e30caa169d4d91446ee4520882a3&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// """POST""" data to the Server-Side
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

// """GET""" getData from the External API "OpenWeatherMap"
const getData = async (url = "", zipCode = "") => {
    const respone = await fetch(url + zipCode + API);
    try {
        const data = await respone.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
// Gets projectData "Endpoint" Data and dynamically udapte the UI to match the returned values.
const returnEndpointDataAndUpdateUI = async () => {
    const request = await fetch('/getProjectData');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temperature}`;
        document.getElementById('content').innerHTML = `Feeling : ${allData.userResponse}`;
    } catch (error) {
        console.log(error);
    }
};
// Adding Event Listner to the "Generate Key" to trigger all of the above 
// functionalities to work asynchro. together.
document.getElementById("generate").addEventListener("click", function () {
    // Gets data from the API.
    getData(baseUrl, document.getElementById('zip').value).then(function (data) {
        data.date = newDate;
        data.userResponse = document.getElementById('feelings').value;
        // Posts data to the server endpoint.
        postData("/postProjectData", data)
            // retruns server endpoint's data and update the UI accordingly.
            .then(returnEndpointDataAndUpdateUI());
    });
});
