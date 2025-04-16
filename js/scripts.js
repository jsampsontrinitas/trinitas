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

// This while loop runs as long a two conditions are true:
// 1. The userAnswer variable DOES NOT equal "please", and
// 2. The value of tries is greater than 0
// When one or both of these are false, the while loop will be exit
while ((userAnswer != "please") && (tries > 0)) {
    alert("Wrong. Try again. You have " + tries + " attempts remaining.");
    userAnswer = prompt("What is the secret message?");
    tries = tries - 1;
}

if (userAnswer == "please") {
    h2.hidden = false;
} else {
    h2.textContent = "This is fake, replacement content.";
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

// Setup tracking eyes!
const eyes = document.querySelectorAll(".eye");

// Listen to user mouse movement
document.addEventListener("mousemove", updateEyes);

// Define our function which will run as the mouse moves
function updateEyes (event) {
    // Let's update each of the eyes independently
    for ( const eye of eyes ) {
        // Get the current eye's pupil, and metrics about it
        const pupil = eye.querySelector(".pupil");
        const shape = eye.getBoundingClientRect();
        // Get the distance between the mouse and the pupil
        const dx = event.clientX - (shape.left + shape.width / 2);
        const dy = event.clientY - (shape.top + shape.height / 2);
        // Determine the angle to orient the pupils to the mouse
        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * 10;
        const y = Math.sin(angle) * 10;
        // Update the position of the pupils
        // "translate${x}" - `translate${x}`
        pupil.style.transform = `translate(${x}px, ${y}px)`;
    }
}