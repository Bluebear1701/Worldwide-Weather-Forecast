var appId = "e9c5575e3a5b6939670c3a1588bc2124";
var cityName;
var searchButton = document.querySelector(".button");
var cityInput = document.querySelector("#city");
var currentForecast = document.querySelector("#current-forecast");
var fiveday = document.querySelector("#five-day-forecast");
console.log("Js working");
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
          displayWeather(data);
        });
      });
    });
};

var displayWeather = function (data) {
  var currentTempurature = data.current.temp;
  document.getElementById("current-temp").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = data.current.wind_speed;
  document.getElementById("current-windspeed").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = data.current.humidity;
  document.getElementById("current-humidity").textContent =
    "Humidity: " + currentHumidity;

  var currentUvIndex = data.current.uvi;
  document.getElementById("uv-index").textContent =
    "UV-Index: " + currentUvIndex;

  var currentCityName = cityInput.value;
  document.getElementById("current-city").textContent =
    "City: " + currentCityName;

  var today = moment().format("dddd MM/DD/YYYY, hh:mm");
  $("#current-day").text(today);
};

var displayForecast = function (data) {
  var currentTempurature = data.daily[1].temp;
  document.getElementById("current-temp1").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = data.daily[1].wind_speed;
  document.getElementById("current-windspeed1").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = data.daily[1].humidity;
  document.getElementById("current-humidity1").textContent =
    "Humidity: " + currentHumidity;

  var currentUvIndex = data.daily[1].uvi;
  document.getElementById("uv-index1").textContent =
    "UV-Index: " + currentUvIndex;

  var today = moment(data.daily[1].dt * 1000).format("ddd MM/DD/YYYY");
  $("#current-day1").text(today);
};

function citySearch() {
  cityName = cityInput.value;
  getWeather(cityName);
}

$(".button").on("click", function () {
  var input = $(this).siblings(".input").val();
  var city = $(this).parent().attr("city");
  console.log(input, city);
  //local.storage
  citySearch();
  localStorage.setItem(city, input);
});
$("#city .input").val(localStorage.getItem("city"));
