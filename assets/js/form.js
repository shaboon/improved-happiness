console.log("page loaded");
var mapSec = document.querySelector("#map");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var dateInput = document.querySelector("#date");
var bookBtn = $("#book");
var userInfo = $(".info");

parseBook();

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
  if ((lastBook.name == "") | (lastBook == null)) {
    document.querySelector(".info").textContent =
      "“Adventure is Waiting Just for You...”-Edward Puff";
  } else {
    var bookName = document.querySelector(".flavor");
    var bookDate = document.querySelector(".date");
    var bookMail = document.querySelector(".email");
    console.log(lastBook);
    bookName.textContent = "Greetings " + lastBook.name;
    bookDate.textContent =
      "We welcome your anticipated arrival on " +
      lastBook.date +
      " and will reach out to... ";
    bookMail.textContent =
      "'" + lastBook.email + "' once transport is ready...";
  }
}
