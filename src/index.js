function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let dateTimeElement = document.querySelector("#date-time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateTime = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temp-icon");

  cityElement.innerHTML = response.data.city;
  dateTimeElement.innerHTML = formatDate(dateTime);
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}:`;
}

function searchCity(city) {
  let apiKey = "a5tbfe342e99647c146b3o3b0ff80356";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "a5tbfe342e99647c146b3o3b0ff80356";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temp-max">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temp-min">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFunctionElement = document.querySelector("#search-function");
searchFunctionElement.addEventListener("submit", handleSearchSubmit);
