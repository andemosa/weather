const searchTerm = document.querySelector("[data-city-search]");
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const countryElement = document.querySelector("[data-country]");
const dayElement = document.querySelector("[data-day]");
const temperatureElement = document.querySelector("[data-temperature]");
const humidityElement = document.querySelector("[data-humidity]");
const windElement = document.querySelector("[data-wind]");
const iconContainer = document.querySelector(".icon-container");

searchTerm.addEventListener("change", (e) => {
  const value = searchTerm.value;
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 500) {
        return networkHandler();
      }
      sortData(data);
    });
});

function sortData(data) {
  if (data.cod == 200) {
    const { name: location } = data;
    const { temp: temperature, humidity } = data.main;
    const { main: status, icon, description } = data.weather[0];
    const { speed } = data.wind;
    const { country } = data.sys;
    const lower = lowercase(country);
    const date = setDate();

    const sortedData = {
      location,
      temperature,
      humidity,
      status,
      icon,
      description,
      speed,
      country,
      lower,
      date,
    };
    setWeather(sortedData);
  } else if (data.cod == 404) {
    errHandler();
  }
}

function errHandler() {
  clearWeather()
  statusElement.textContent = `City not found. Try a different search`;
}

function networkHandler() {
  clearWeather()
  statusElement.textContent = `Poor or no internet connection. Please try again`;
}

function setWeather(data) {
  dayElement.textContent = data.date;
  locationElement.textContent = data.location;
  statusElement.textContent = data.status;
  temperatureElement.textContent = data.temperature;
  humidityElement.textContent = data.humidity;
  windElement.textContent = data.speed;
  countryElement.innerHTML = `${data.country} <img src="https://openweathermap.org/images/flags/${data.lower}.png" alt="">`;
  iconContainer.innerHTML = `<img id="icon" src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}" title="${data.description}" >`;
}

function clearWeather(){
  dayElement.textContent = '';
  locationElement.textContent = 'To Find The Weather';
  statusElement.textContent = 'Enter A Location';
  temperatureElement.textContent = '...';
  humidityElement.textContent = '...';
  windElement.textContent = '...';
  countryElement.innerHTML = ``;
  iconContainer.innerHTML = ``;
}

//Helper Functions
function setDate() {
  let now = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function lowercase(string) {
  return string.toLowerCase();
}
