//Dynamic background image

// Get the current date
const currentDate = new Date();

// Get the month (0-11) and day (1-31) of the current date
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

// Define the start and end dates for each season
const winterStartDate = new Date(currentDate.getFullYear(), 11, 1); // Dec 1
const winterEndDate = new Date(currentDate.getFullYear() + 1, 1, 29); // Feb 28/29

const springStartDate = new Date(currentDate.getFullYear(), 2, 1); // Mar 1
const springEndDate = new Date(currentDate.getFullYear(), 4, 31); // May 31

const summerStartDate = new Date(currentDate.getFullYear(), 5, 1); // Jun 1
const summerEndDate = new Date(currentDate.getFullYear(), 7, 31); // Aug 31

const fallStartDate = new Date(currentDate.getFullYear(), 8, 1); // Sep 1
const fallEndDate = new Date(currentDate.getFullYear(), 10, 30); // Nov 30

// Check if the current date is within a season
if (
  (currentDate >= winterStartDate && currentDate <= winterEndDate) ||
  (currentDate >= winterStartDate &&
    currentDate <= winterEndDate &&
    isLeapYear(currentDate.getFullYear()))
) {
  // Set the background image for winter
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/459/original/jaanus-jagomagi-winter.jpg?1698723962')";
} else if (currentDate >= springStartDate && currentDate <= springEndDate) {
  // Set the background image for spring
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/458/original/john-price-spring.jpg?1698723666')";
} else if (currentDate >= summerStartDate && currentDate <= summerEndDate) {
  // Set the background image for summer
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/457/original/frank-mckenna-summer.jpg?1698722810')";
} else if (currentDate >= fallStartDate && currentDate <= fallEndDate) {
  // Set the background image for fall
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/460/original/johannes-klingebiel-fall.jpg?1698725800')";
} else {
  // If none of the conditions are met, set a default background image
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/038/139/original/davies-designs-studio-G-6kwVnClsE-unsplash_med.jpg?1655907686')";
}

// Function to check if a year is a leap year
function isLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true; // Divisible by 4, 100, and 400, it's a leap year
      } else {
        return false; // Divisible by 4 and 100, but not 400, it's not a leap year
      }
    } else {
      return true; // Divisible by 4, but not 100, it's a leap year
    }
  } else {
    return false; // Not divisible by 4, it's not a leap year
  }
}
//Current weather and date
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
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;
  let date = new Date(response.data.dt * 1000);
  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#current-weather-image");
  iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;
}

//Format date
function formatDate(date) {
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

//City search
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

//Geolocation
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

//Default city
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
