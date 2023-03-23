var apiKey = '0578539c9ba7ff6fc8e3f6f54cac232c';
var reserveBtn = $("#reserve");
var slideIndex = 1;
SlideShow(slidePosition);

reserveBtn.on("click", function () {
  window.location.href = "./reserve.html";
});

// forward/Back controls
function plusSlide(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var circles = document.getElementsByClassName("dot");
  if (n > slides.length) {slidePosition = 1}
  if (n < 1) {slidePosition = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
      circles[i].className = circles[i].className.replace("enable", "");
  }
  slides[slidePosition-1].style.display = "block";
  circles[slidePosition-1].className += " enable";
} 

function getCurrentWeather(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // CURRENT WEATHER DATA
      console.log(data);
    });
}

function getFiveDayWeather(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // 5 DAY WEATHER DATA
      console.log(data);
    });
}

function init() {
  var city = 'Mekoryuk';

  fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=' + 1 + '&appid=' + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getCurrentWeather(lat, lon);
      getFiveDayWeather(lat, lon);
    });
}

init();