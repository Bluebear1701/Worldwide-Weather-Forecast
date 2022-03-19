var appId ="e9c5575e3a5b6939670c3a1588bc2124";
var cityName;
var searchButton = document.querySelector('.btn');
var cityInput = document.querySelector("#city");

var getcoordinates = function() {
fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + appId)
    .then(function(response){
    return response.json();
    }).then (function(data){
        console.log(data)
    });
};

var getWeather = function () {
    fetch(
        "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + appId
    )
    .then (function (response){
        return response.json();
    })
    .then (function(data) {
       var latitude = data[0].lat;
        var longitude = data[0].lon; 
        return [latitude, longitude];
    })
    .then (function(value){
        fetch ("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + appId)
        .then(function(response) {
            return response.json();
        });
    });
};

var citySearch = function() {
    cityName =cityInput.value;
}
searchButton.addEventListener("click", citySearch);
