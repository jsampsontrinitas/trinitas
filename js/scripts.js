const h1 = document.getElementById("title");
const h2 = document.querySelector("h2");
const el = document.querySelector("#currenttime");
const username = prompt("What is your name, traveler?");

// Can the use see our secret content?
if ( "please" == prompt("What is the secret message?") ) {
    h2.hidden = false;
}

// Update our clock once every second
setInterval(setTime, 500);

// Greet the user by the name they provided
h1.textContent = "Hello, " + username;

function setTime() {
    el.textContent = new Date().toLocaleTimeString();
}