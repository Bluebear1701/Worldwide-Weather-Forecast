var appId = "e9c5575e3a5b6939670c3a1588bc2124";
var cityName;
var searchButton = document.querySelector(".button");
var cityInput = document.querySelector("#city");
var currentForecast = document.querySelector("#current-forecast");
var fiveday = document.querySelector("#five-day-forecast");

// calling to get coordinates
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

// using coordinates to get weather data 
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

//now can display weather
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

// this will call to get 5 day forecast 
var getForecast = function () {
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
            if (response.ok) {
                response.json().then(function (data) {
                  console.log(data);
                  //displayWeather(data);
                  displayForecast(data.daily);

            });
          };
        });
      });
  };

  // this will help me display forecast
var displayForecast = function (daily) {
    var today = moment().add(1, "days").format("MMMM Do");
    $("#current-day1").text(today);

  var currentTempurature = daily[0].temp.day;
  document.getElementById("current-temp1").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = daily[0].wind_speed;
  document.getElementById("current-windspeed1").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = daily[0].humidity;
  document.getElementById("current-humidity1").textContent =
    "Humidity: " + currentHumidity; 



//var displayForecast = function (daily) 
    var today = moment().add(2, "days").format("MMMM Do");
    $("#current-day2").text(today);

  var currentTempurature = daily[1].temp.day;
  document.getElementById("current-temp2").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = daily[1].wind_speed;
  document.getElementById("current-windspeed2").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = daily[1].humidity;
  document.getElementById("current-humidity2").textContent =
    "Humidity: " + currentHumidity; 



//var displayForecast = function (daily) {
    var today = moment().add(3, "days").format("MMMM Do");
    $("#current-day3").text(today);

  var currentTempurature = daily[2].temp.day;
  document.getElementById("current-temp3").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = daily[2].wind_speed;
  document.getElementById("current-windspeed3").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = daily[2].humidity;
  document.getElementById("current-humidity3").textContent =
    "Humidity: " + currentHumidity; 



//var displayForecast = function (daily) {
    var today = moment().add(4, "days").format("MMMM Do");
    $("#current-day4").text(today);

  var currentTempurature = daily[3].temp.day;
  document.getElementById("current-temp4").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = daily[3].wind_speed;
  document.getElementById("current-windspeed4").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = daily[3].humidity;
  document.getElementById("current-humidity4").textContent =
    "Humidity: " + currentHumidity; 



//var displayForecast = function (daily) {
    var today = moment().add(5, "days").format("MMMM Do");
    $("#current-day5").text(today);

  var currentTempurature = daily[4].temp.day;
  document.getElementById("current-temp5").textContent =
    "Tempurature: " + currentTempurature;

  var currentWindspeed = daily[4].wind_speed;
  document.getElementById("current-windspeed5").textContent =
    "Windspeed: " + currentWindspeed;

  var currentHumidity = daily[4].humidity;
  document.getElementById("current-humidity5").textContent =
    "Humidity: " + currentHumidity; 

};

// call my data
function citySearch() {
  cityName = cityInput.value;
  getWeather(cityName);  
  getForecast()
}

$(".button").on("click", function () {
  var input = $(this).siblings(".input").val();
  var city = $(this).parent().attr("city");
  console.log(input, city);
  //local.storage
   citySearch();
//   localStorage.setItem(city, input);
});
$("#city .input").val(localStorage.getItem("city"));
