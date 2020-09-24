"use strict";

const apiKey = "bB43jgxz62Zk8kFtbwOBHE5QkhdxLXahqQpljI9F";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join("&");
}

function displayResults(responseJson) {
    console.log(responseJson);
    $("#js-results-list").empty();
    //loop through the response object
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#js-results-list").append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
            </li>`
        );
    };
    $("#results").removeClass("hidden");
}

function getParksList(statesArray, maxResults=10) {
    const params = {
        api_key: apiKey,
        stateCode: statesArray,
        limit: maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    //console.log(url);

    fetch(url)
        .then(response => response.ok ? response.json() : Error(response.statusText))
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something went wrong: ${err.message}`);
        });

}

function handleSubmitClicked() {
    $("form").submit(event => {
        event.preventDefault();
        const selectedStates = $(".js-state-input").val();
        const maxResults = $(".js-max-results").val();
        getParksList(selectedStates, maxResults);
    });
}

$(handleSubmitClicked);