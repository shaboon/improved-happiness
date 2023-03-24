// Key for weather API, otherwise non-functional
var apiKey = "0578539c9ba7ff6fc8e3f6f54cac232c";
// targets top button of page
var reserveBtn = $("#reserve");
// const created that groups the buttons with data-attribute for carousel
const buttons = document.querySelectorAll("[data-carousel-button]");

// When button is clicked, page opens href
reserveBtn.on("click", function () {
  window.location.href = "./reserve.html";
});

// Function to call weather given values of lat and lon from call source
function getFiveDayWeather(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey
  )
    // promise chain - checks and parses response from API
    .then(function (response) {
      return response.json();
    })
    // promise chain - uses parsed response as data which can be read
    .then(function (data) {
      // Current Weather
      var today = document.querySelectorAll(".today");
      for (let i = 0; i < today.length; i++) {
        today[i].innerHTML = data.list[i].main.temp + "°F";
        // index to array for all elements with class "today", which happens to be only one
      }
      // 5 DAY WEATHER DATA
      console.log(data);
      var weather = document.querySelectorAll(".wcard");
      for (let i = 0; i < weather.length; i++) {
        weather[i].innerHTML = data.list[i + 3].main.temp + "°F";
        // index to array for all elements with class "wcard" and fills non-today cards with text as HTML for targetted element
      }
      console.log(data);
      console.log(weather);
      // debugging tools to ensure API response
    });
}

// function called on page init (called by init lower on page)
function init() {
  var city = "Mekoryuk";

  // calls API and sets required parameters such as city and key
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
    // from data, lat and lon is pulled, then function is given variables
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getFiveDayWeather(lat, lon);
    });
}

// Carousel buttons
buttons.forEach((button) => {
  // runs behaviour for each button that matches variable
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    // if target is less than length (for scaling), function will push to next value - thus next slide
    if (newIndex < 0) newIndex = slides.children.length - 1;
    // if target is more than length (for scaling), then it restarts the index - thus the chain
    if (newIndex >= slides.children.length) newIndex = 0;

    // creates new active dataset for target slide
    slides.children[newIndex].dataset.active = true;
    // Deletes last active dataset
    delete activeSlide.dataset.active;
  });
});

init();
