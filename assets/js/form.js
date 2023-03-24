// debug tool
console.log("page loaded");
var mapSec = document.querySelector("#map");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var dateInput = document.querySelector("#date");
var bookBtn = $("#book");
var userInfo = $(".info");

// calls parse function
parseBook();

// logs all input values
bookBtn.on("click", function (event) {
  console.log("line 43");
  // prevents page wipe before localStorage log
  event.preventDefault();
  console.log("line 45");

  // object created for string and parse
  var user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    date: dateInput.value.trim(),
  };

  // Stringifies object to JSON string for easy localStorage call opposed to multiple values having to be called
  localStorage.setItem("user", JSON.stringify(user));
  console.log("line 54");
  // reloads page to update info section and show logged values
  window.location.reload();
});

// parsing function
function parseBook() {
  // variable made as parsed object from storage
  var lastBook = JSON.parse(localStorage.getItem("user"));
  console.log(lastBook);
  if (lastBook == null) {
    document.querySelector(".info").textContent =
      "“Adventure is Waiting Just for You...”-Edward Puff";
  } else {
    var bookName = document.querySelector(".flavor");
    var bookDate = document.querySelector(".date");
    var bookMail = document.querySelector(".email");
    console.log(lastBook);
    // sets parsed values to required places
    bookName.textContent = "Greetings " + lastBook.name;
    bookDate.textContent =
      "We welcome your anticipated arrival on " +
      lastBook.date +
      " and will reach out to... ";
    bookMail.textContent =
      "'" + lastBook.email + "' once transport is ready...";
  }
}
