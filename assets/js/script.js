var appId = "e9c5575e3a5b6939670c3a1588bc2124";
var cityName;
var searchButton = document.querySelector(".button");
var cityInput = document.querySelector("#city");


var getcoordinates = function () {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      appId
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};



var getWeather = function () {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      appId
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      return [latitude, longitude];
    })
    .then(function (value) {
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          value[0] +
          "&lon=" +
          value[1] +
          "&units=imperial" +
          "&appid=" +
          appId
      ).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
        });
      });
    });
};

var displayWeather = function(weather, searchCity){
    //clear old content
    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;
};
    //console.log(weather);
    var currentdate=document.createElement("span")
    currentdate.textContent="("+ moment.js(weather.dt.value).format(LLLL) +")";
    citySearchInputEl.appendChild(currentdate);

function citySearch() {
    cityName = cityInput.value;
    getWeather(cityName);
}

searchButton.addEventListener("click", citySearch);
