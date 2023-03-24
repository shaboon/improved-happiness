var apiKey = "0578539c9ba7ff6fc8e3f6f54cac232c";
var reserveBtn = $("#reserve");
const buttons = document.querySelectorAll("[data-carousel-button]");

reserveBtn.on("click", function () {
  window.location.href = "./reserve.html";
});

function getFiveDayWeather(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // 5 DAY WEATHER DATA
      console.log(data);
      var weather = document.querySelectorAll(".wcard");
      for (let i = 0; i < weather.length; i++) {
        weather[i].innerHTML = "Temp " + data.list[i].main.temp + "°F";
      }
      console.log(data);
      console.log(weather);
    });
}

function init() {
  var city = "Mekoryuk";

  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=" +
      1 +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getFiveDayWeather(lat, lon);
    });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

init();
