// These are all "const," because we expect no changes to their value
const h1 = document.getElementById("title");
const h2 = document.querySelector("h2");
const el = document.querySelector("#currenttime");
const username = prompt("What is your name, traveler?");

// Types of values
let string_type = "Hello!";
let another_string_type = 'Hello';
let yet_another_string_type = `Hello`;
let number_type = 42;
let boolean_type = true;
let object_type = { name: "jonathan" };
let array_type = ["Hello", "World"];

// We're going to change this value at least once more
let timevalue;

// Can the use see our secret content?
let tries = 10;
let userAnswer = prompt("What is the secret message?");

while (userAnswer != "please" && tries > 0) {
    alert("Wrong. Try again. You have " + tries + " attempts remaining.");
    userAnswer = prompt("What is the secret message?");
    tries = tries - 1;
}

if (userAnswer == "please") {
    h2.hidden = false;
}


// Update our clock once every second
setInterval(setTime, 1_000);

// Greet the user by the name they provided
if (h1) {
    h1.textContent = "Hello, " + username;
} else {
    throw new Error("Oh no! Where's my h1?");
}

// This function name uses "camel case"
function curveBallPitch() { }

function setTime() {
    timevalue = new Date().toLocaleTimeString();
    renderTime();
}

function renderTime() {
    el.textContent = timevalue;
}