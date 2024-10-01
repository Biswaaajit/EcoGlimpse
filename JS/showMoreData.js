// function to get weekday

function getDay(date) {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(date);
  let day = weekday[d.getDay()];
  return day;
}

// function to show added location

function showMoreData(data) {
  moreDetails.innerHTML = "";
  console.log(data);
  const {
    temperature_2m_max: temp,
    time,
    weather_code: code,
    wind_speed_10m_max: wind,
  } = data;

  for (let i = 1; i <= 5; i++) {
    let weatherInfo = getWeatherIcon(code[i]);
    let day = getDay(time[i]);

    //    creating Elements
    const container = document.createElement("div");
    const dayPara = document.createElement("p");
    const weatherPara = document.createElement("p");
    const infoPara = document.createElement("p");
    const tempPara = document.createElement("p");
    const windPara = document.createElement("p");

    //    Patching Element
    moreDetails.appendChild(container);
    container.appendChild(dayPara);
    container.appendChild(weatherPara);
    container.appendChild(infoPara);
    container.appendChild(tempPara);
    container.appendChild(windPara);

    //    Adding Value
    dayPara.innerText = day;
    weatherPara.innerHTML = weatherInfo.icon;
    infoPara.innerText = weatherInfo.des;
    tempPara.innerHTML = `${temp[i]}<sup>o</sup>C`;
    windPara.innerText = `${wind[i]} m/s`;

    //    Adding class
    container.classList.add(
      "blurEffect",
      "rounded-xl",
      "leading-7",
      "h-fit",
      "sm:leading-none",
      "w-fit",
      "flex",
      "flex-col",
      "items-center",
      "px-4",
      "py-1",
      "space-y-0",
      "sm:space-y-2",
      "lg:py-3",
      "transition-all"
    );
    dayPara.classList.add("text-center");
    weatherPara.classList.add("text-[8vw]", "sm:text-[6vw]", "lg:text-6xl");
    infoPara.classList.add("hidden", "md:block", "text-slate-400");
    tempPara.classList.add("text-base", "md:text-lg");
    windPara.classList.add("text-sm", "text-slate-400");
  }
}
