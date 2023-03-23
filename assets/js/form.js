console.log("page loaded");
var mapSec = document.querySelector("#map");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var dateInput = document.querySelector("#date");
var bookBtn = $("#book");
var userInfo = $(".info");

parseBook();

// function createMarker() {
//   var markerFrom = L.circleMarker([28.61, 77.23], {
//     color: "#F00",
//     radius: 10,
//   });
//   var markerTo = L.circleMarker([60.10646, -166.307471], {
//     color: "#4AFF00",
//     radius: 10,
//   });
//   var from = markerFrom.getLatLng();
//   var to = markerTo.getLatLng();
//   markerFrom.bindPopup("Delhi " + from.toString());
//   markerTo.bindPopup("Mumbai " + to.toString());
//   map.addLayer(markerTo);
//   map.addLayer(markerFrom);
//   getDistance(from, to);
// }

// function getDistance(from, to) {
//   var container = document.getElementById("distance");
//   container.innerHTML =
//     "New Delhi to Mumbai - " + from.distanceTo(to).toFixed(0) / 1000 + " km";
// }

bookBtn.on("click", function (event) {
  console.log("line 43");
  event.preventDefault();
  console.log("line 45");

  var user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    date: dateInput.value.trim(),
  };

  localStorage.setItem("user", JSON.stringify(user));
  console.log("line 54");
  window.location.reload();
});

function parseBook() {
  var lastBook = JSON.parse(localStorage.getItem("user"));
  console.log(lastBook);
  if (lastBook == null) {
    document.querySelector(".info").textContent =
      "“Adventure is Waiting Just for You...”-Edward Puff";
  } else {
    var bookName = document.querySelector(".flavor");
    var bookDate = document.querySelector(".date");
    var bookMail = document.querySelector(".flavor");
    console.log(lastBook);
    bookName.textContent = "Greetings " + lastBook.name;
    bookDate.textContent =
      "We welcome your anticipated arrival on" +
      lastBook.date +
      " and will reach out to '";
    bookMail.textContent = lastBook.email + "' once transport is ready...";
  }
}

// fetch(weatherApi).then(function (response) {
//   if (response.ok) {
//   }
// });
