const userInput = document.querySelector("#userInput");
const currDataContainer = document.querySelector("#currDataContainer");
const dropBox = document.querySelector("#dropBox");
const spinner = document.querySelector("#spinner");
const moreDetails = document.querySelector("#moreDetails");
const errMsg = document.querySelector("#errorMsg");

//                        function to get weather data

async function getWeatherData(latitude, longitude, timezone) {
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,wind_speed_10m_max&wind_speed_unit=ms`
  );
  const data = await weatherRes.json();
  return data;
}

//                          function to print weather data

function showCurrentData(obj, flag, country, place) {
  // extracting API datas
  currDataContainer.style.display = "block";

  const {
    relative_humidity_2m: humidity,
    temperature_2m: temp,
    weather_code: wcode,
    wind_speed_10m: wind,
  } = obj;

  const weatherInfo = getWeatherIcon(wcode);

  //creating Element

  const placeInfoContainer = document.createElement("div");
  const placeInfoPara = document.createElement("p");
  const placeInfoDiv = document.createElement("div");
  const tempInfoContainer = document.createElement("div");
  const tempInfoPara = document.createElement("p");
  const tempInfoDiv = document.createElement("div");
  const windInfoContainer = document.createElement("div");
  const windInfoFirstDiv = document.createElement("div");
  const windInfoSecondDiv = document.createElement("div");

  //       Adding value

  placeInfoPara.innerText = place;
  placeInfoDiv.innerHTML = `<p class="text-slate-400">${country}</p>
              <img
                src="https://flagcdn.com/20x15/${flag}.png"
                width="20"
                height="15"
                alt="Ukraine"
              />`;
  tempInfoPara.innerHTML = `${temp}<sup>o</sup>C`;
  tempInfoDiv.innerHTML = `<span class="text-[9vw] sm:text-5xl lg:text-6xl xl:text-7xl"
                  >${weatherInfo.icon}</span>
                <p class="font-md text-lg">${weatherInfo.des}</p>`;
  windInfoFirstDiv.innerHTML = `<span class="text-2xl"><i class="fa-solid fa-wind"></i></span>
                <span class="text-xl">${wind} m/s</span>`;
  windInfoSecondDiv.innerHTML = `<span class="text-2xl"
                  ><i class="fa-solid fa-droplet"></i
                ></span>
                <span class="text-xl">${humidity}%</span>`;

  //     Adding class

  placeInfoPara.classList.add("text-slate-200", "font-semibold", "text-2xl");
  placeInfoDiv.classList.add("flex", "gap-2", "items-center");
  tempInfoContainer.classList.add(
    "w-full",
    "flex",
    "justify-between",
    "gap-0",
    "lg:gap-14",
    "items-center"
  );
  tempInfoPara.classList.add(
    "text-[10vw]",
    "sm:text-6xl",
    "lg:text-7xl",
    "xl:text-8xl"
  );
  tempInfoDiv.classList.add("flex", "flex-col", "items-center");
  windInfoContainer.classList.add("flex", "gap-8");
  windInfoFirstDiv.classList.add("windInfoDiv");
  windInfoSecondDiv.classList.add("windInfoDiv");

  //Patching the elements

  currDataContainer.appendChild(placeInfoContainer);
  placeInfoContainer.appendChild(placeInfoPara);
  placeInfoContainer.appendChild(placeInfoDiv);
  currDataContainer.appendChild(tempInfoContainer);
  tempInfoContainer.appendChild(tempInfoPara);
  tempInfoContainer.appendChild(tempInfoDiv);
  currDataContainer.appendChild(windInfoContainer);
  windInfoContainer.appendChild(windInfoFirstDiv);
  windInfoContainer.appendChild(windInfoSecondDiv);
}

//                                   Data input function

async function showData(input) {
  currDataContainer.style.display = "none";
  currDataContainer.innerHTML = "";
  moreDetails.innerHTML = "";
  dropBox.style.display = "none";
  errMsg.style.display = "none";
  const regex = /^[A-Za-z]+$/;

  if (!input) {
    errMsg.innerText = "Please enter a location";
    errMsg.style.display = "block";
    return;
  }

  if (!regex.test(input)) {
    errMsg.innerText = "Enter a valid location";
    errMsg.style.display = "block";
    return;
  }

  spinner.style.display = "block";

  //fetching latitude and longitude
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en`
    );
    const data = await res.json();
    const { latitude, longitude, timezone, name, country, country_code } =
      data.results.at(0);
    let countryCode = country_code.toLowerCase();

    //fetching weather data
    const weatherData = await getWeatherData(latitude, longitude, timezone);
    spinner.style.display = "none";
    showCurrentData(weatherData.current, countryCode, country, name);
    showMoreData(weatherData.daily);
    setList(input);
  } catch (err) {
    errMsg.innerText = "Unable to fetch Weather Data!!!";
    errMsg.style.display = "block";
  } finally {
    spinner.style.display = "none";
    userInput.value = "";
  }
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  showData(userInput.value);
});

// initially loading weather data of a city

showData("kolkata");
