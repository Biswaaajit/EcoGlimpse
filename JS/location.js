import { showCurrentData } from "../index.js";
import { showMoreData } from "./showMoreData.js";
import { getWeatherData } from "../index.js";
const trackLocation = document.querySelector("#trackLocation");
const spinner = document.querySelector("#spinner");
const currDataContainer = document.querySelector("#currDataContainer");
const moreDetails = document.querySelector("#moreDetails");
const errMsg = document.querySelector("#errorMsg");

trackLocation.addEventListener("click", function () {
  currDataContainer.style.display = "none";
  currDataContainer.innerHTML = "";
  moreDetails.innerHTML = "";
  spinner.style.display = "block";
  errMsg.style.display = "none";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    let lat = pos.coords.latitude;
    let log = pos.coords.longitude;
    let api = "48a19ddb5a2a49c69d20d9cd86f0d2ff";

    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${log}&format=json&apiKey=${api}`
      );

      const data = await res.json();
      let locationData = data.results.at(0);

      // destructuring data

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
    } catch (err) {
      errMsg.innerText = "Unable to fetch data through location!!!";
      errMsg.style.display = "block";
    } finally {
      spinner.style.display = "none";
    }
  });
});
