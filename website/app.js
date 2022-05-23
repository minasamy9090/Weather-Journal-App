/* Global Variables */
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const API = "&appid=6511e30caa169d4d91446ee4520882a3&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


const getData = async (url = "", zipCode = "") => {
    const respone = await fetch(url + zipCode + API);
    try {
        const data = await respone.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

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
document.getElementById("generate").addEventListener("click", function () {
    getData(baseUrl, document.getElementById('zip').value).then(function (data) {
        data.date = newDate;
        data.userResponse = document.getElementById('feelings').value;
        postData("/postProjectData", data)
            .then(returnEndpointDataAndUpdateUI());
    });
});
