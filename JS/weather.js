export function getWeatherIcon(code) {
  if (code == 0 || code == 1) {
    return {
      icon: '<i class="fa-solid fa-sun"></i>',
      des: "Clear Sky",
    };
  } else if (code == 2)
    return {
      icon: '<i class="fa-solid fa-cloud-sun"></i>',
      des: "Partly Cloudy",
    };
  else if (code == 3)
    return {
      icon: '<i class="fa-solid fa-cloud"></i>',
      des: "Cloudy",
    };
  else if (code == 45 || code == 48)
    return {
      icon: '<i class="fa-solid fa-smog"></i>',
      des: "Foggy",
    };
  else if (code == 51 || code == 56 || code == 61 || code == 66 || code == 80)
    return {
      icon: '<i class="fa-solid fa-cloud-rain"></i>',
      des: "Light Rain",
    };
  else if (
    code == 53 ||
    code == 63 ||
    code == 65 ||
    code == 57 ||
    code == 55 ||
    code == 67 ||
    code == 81 ||
    code == 82
  )
    return {
      icon: '<i class="fa-solid fa-cloud-showers-heavy"></i>',
      des: "Heavy Rain",
    };
  else if (
    code == 71 ||
    code == 73 ||
    code == 75 ||
    code == 77 ||
    code == 85 ||
    code == 86
  ) {
    return {
      icon: '<i class="fa-solid fa-snowflake"></i>',
      des: "Snowfall",
    };
  } else if (code == 95 || code == 96 || code == 99)
    return {
      icon: '<i class="fa-solid fa-cloud-bolt"></i>',
      des: "Thunderstorm",
    };
  else return 0;
}
