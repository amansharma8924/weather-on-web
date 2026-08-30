const API_KEY = "Put_ur_openweathermap_APIKey_her"; // put ur openweathermap key here
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const UNITS = "metric"
var DEFAULT_CITY = "India"

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const spinner = document.getElementById("spinner");
const errorBox = document.getElementById("errorBox");
const errorText = document.getElementById("errorText");
const card = document.getElementById("weatherCard");

const icon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const city = document.getElementById("city");
const datetime = document.getElementById("datetime");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function showSpinner(){
  spinner.hidden = false;
  card.hidden = true;
  errorBox.hidden = true;
}

function showError(msg){
  spinner.hidden = true;
  card.hidden = true;
  errorText.textContent = msg;
  errorBox.hidden = false;
}

async function getWeather(query) {
  showSpinner();

  const params = new URLSearchParams({ appid: API_KEY, units: UNITS });
  if(query.city){
    params.set("q", query.city)
  }else{
    params.set("lat", query.lat);
    params.set("lon", query.lon)
  }

  try {
    const res = await fetch(BASE_URL + "?" + params);
    if (!res.ok) {
      throw res.status;
    }
    const data = await res.json();
    render(data);
  } catch (err) {
    console.log(err); // debug
    if (err == 404) {
      showError("City not found. Please check the spelling.");
    } else if (err == 401) {
      showError("Invalid API key, might still be activating");
    } else if (err == 429){
      showError("too many requests, wait a sec")
    } else {
      showError("Could not fetch weather. Check your connection and try again.");
    }
  }
}

function render(data) {
  const cond = data.weather[0];
  const tempUnit = UNITS === "imperial" ? "°F" : "°C";
  const windUnit = UNITS === "imperial" ? "mph" : "m/s";

  icon.src = "https://openweathermap.org/img/wn/" + cond.icon + "@2x.png";
  icon.alt = cond.description;
  temp.textContent = Math.round(data.main.temp) + tempUnit;
  condition.textContent = cond.description;
  city.textContent = data.name + ", " + data.sys.country;
  datetime.textContent = cityTime(data.dt, data.timezone);
  feelsLike.textContent = Math.round(data.main.feels_like) + tempUnit;
  humidity.textContent = data.main.humidity + "%";
  wind.textContent = Math.round(data.wind.speed) + " " + windUnit;

  setTheme(cond.id, cond.icon);

  spinner.hidden = true;
  errorBox.hidden = true;
  card.hidden = false;
}

function cityTime(dt, offset) {
  // shifting manually since api gives utc + offset separately
  const date = new Date((dt + offset) * 1000);
  return date.toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function setTheme(id, icon) {
  const isNight = icon.endsWith("n");
  let theme;

  if (id >= 200 && id < 300) theme = "thunder";
  else if (id >= 300 && id < 600) theme = "rain";
  else if (id >= 600 && id < 700) theme = "snow";
  else if (id >= 700 && id < 800) theme = "mist";
  else if (id === 800) theme = isNight ? "clear-night" : "clear-day";
  else if (id > 800) theme = "clouds";
  else theme = "default";

  document.body.className = "theme-" + theme;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = input.value.trim();
  if (!cityName) return;
  getWeather({ city: cityName });
  input.blur();
});

function init() {
  if (!navigator.geolocation) {
    getWeather({ city: DEFAULT_CITY });
    return;
  }

  showSpinner();
  navigator.geolocation.getCurrentPosition(
    (pos) => getWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
    () => {
      getWeather({ city: DEFAULT_CITY });
    },
    { timeout: 10000 }
  );
}

init();
