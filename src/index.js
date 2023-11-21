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
  let city = response.data.city;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  celsiusTemperature = response.data.temperature.current;
  let tempElement = document.querySelector("#temp-value");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
  let description = response.data.condition.description;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#current-weather-image");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
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
  let apiKey = "bf7b6c4oac467723a2fta09fb7854411";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
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

//Geolocation, current weather
function determinePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "bf7b6c4oac467723a2fta09fb7854411";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determinePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

//Conversion
function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-value");

  let tempF = Math.round(celsiusTemperature * (9 / 5) + 32);
  tempElement.innerHTML = tempF;

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-value");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", showCelsius);

let celsiusTemperature = null;

//Forecast
function getForecast(city) {
  let apiKey = "bf7b6c4oac467723a2fta09fb7854411";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="week-day">${day}</div>
        <div class="weather-image">☁</div>
        <div class="temperature-range">
          <div class="max-temp">15º</div>
          <div class="min-temp">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

/*

function testApi() {
  let apiKey = "bf7b6c4oac467723a2fta09fb7854411";
  let city = "Malmo";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
}

function testForecastApi() {
  let apiKey = "bf7b6c4oac467723a2fta09fb7854411";
  let city = "Malmo";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
}
*/

//Run functions
searchCity("Kyiv");
