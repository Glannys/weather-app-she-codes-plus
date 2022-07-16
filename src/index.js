function updateDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let dayAndTime = `${currentDay} ${currentHours}:${currentMinutes}`;
  return dayAndTime;
}

let now = new Date();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = updateDate(now);

function showWeather(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-value");
  tempElement.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;
}

function searchCity(city) {
  let apiKey = "a5cafaaafa9457566a6cc6457f4d0422";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  if (city) {
    searchCity(city);
  } else {
    city = null;
    alert("Please type a city");
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function determinePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a5cafaaafa9457566a6cc6457f4d0422";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determinePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

searchCity("Kyiv");

/*
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = 63;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = 17;
}

let temperatureF = document.querySelector("#fahrenheit-link");
temperatureF.addEventListener("click", convertToFahrenheit);

let temperatureC = document.querySelector("#celsius-link");
temperatureC.addEventListener("click", convertToCelsius);
*/
