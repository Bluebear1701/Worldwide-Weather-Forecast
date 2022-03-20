var appId = "e9c5575e3a5b6939670c3a1588bc2124";
var cityName;
var searchButton = document.querySelector(".button");
var cityInput = document.querySelector("#city");
var currentForecast = document.querySelector("#current-forecast");
var fiveday = document.querySelector("#five-day-forecast");

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
    "Tempurature:" + currentTempurature;  
};


var today = moment().format("ddd MM/DD/YYYY, hh:mm");
$("#currentDay").html(today);

function citySearch() {
  cityName = cityInput.value;
  getWeather(cityName);
}

$(".button").on("click", function () {
  var input = $(this).siblings(".input").val();
  var city = $(this).parent().attr("city");
  //local.storage
  localStorage.setItem(city, input);
});
$("#city .input").val(localStorage.getItem("city"));
