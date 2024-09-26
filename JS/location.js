import { showCurrentData } from "../index.js";
import { showMoreData } from "./showMoreData.js";
import { getWeatherData } from "../index.js";
const trackLocation = document.querySelector("#trackLocation");

trackLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    let lat = pos.coords.latitude;
    let log = pos.coords.longitude;
    let api = "48a19ddb5a2a49c69d20d9cd86f0d2ff";

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${log}&format=json&apiKey=${api}`
    );
    const data = await res.json();
    let locationData = data.results.at(0);
    const weatherData = await getWeatherData(
      lat,
      log,
      locationData.timezone.name
    );
    showCurrentData(
      weatherData.current,
      locationData.country_code,
      locationData.country,
      locationData.city
    );
    showMoreData(weatherData.daily);
  });
});
