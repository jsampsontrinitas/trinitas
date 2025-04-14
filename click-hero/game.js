/**
 * We start by creating some "game state" variables that will
 * track whether or not we're playing, what the user's score
 * is, how much time remains, etc. Because the values of these
 * variables will change over time, we create them with "let".
 * The `score` variable has a Number value (0). `isPlaying`
 * has a Boolean value (false). `timeLeft` has a Number value
 * because its value is `gameTime`, and `gameTime` has a
 * Number value. In this scenario, whatever value is associated
 * with `gameTime` gets copied into `timeLeft`, so they both
 * start with the same value.
 */
let score = 0;
let isPlaying = false;
let gameTime = 10;
let timeLeft = gameTime;
let gameTracker = null;

/**
 * Next we get some references to our UI elements (such as our
 * buttons). We use "const" to create these, since we do not
 * want to update the references at any point in the future.
 * Notice how we use CSS selector syntax to look-up elements!
 * The document.querySelector method returns either an Element
 * reference (upon success), or a `null` value on failure. If
 * our CSS selector is accurate, then we expect an Element.
 */
const scoreDisplay = document.querySelector("#scoreDisplay");
const timeDisplay = document.querySelector("#timeDisplay");
const scoreList = document.querySelector("#scoreList");
const startButton = document.querySelector("#startButton");
const progressBar = document.querySelector("#progressBar");

/**
 * This is where the fun begins. We create an "event listener"
 * on our start button. This listens for "click" events, and
 * calls our "beginGameFlow" function when they happen. We use
 * event listeners (via "addEventListener") to handle input 
 * and interaction from the user.
 */
startButton.addEventListener("click", beginGameFlow);

/**
 * This is the function we referenced above. Now, instead of
 * merely referencing it, we define it. We say what it does
 * when it is executed. In our case, calling "beginGameFlow"
 * is a shortcut or alias for calling "prepareForGame" and
 * "runCountdownSequence" functions. When we want to run, or
 * execute a function, we put ( and ) after it. If we want
 * to pass something into that function, we add that between
 * the parenthesis.
 */
function beginGameFlow() {
    prepareForGame();
    runCountdownSequence(startGame);
}

/**
 * This is the first function that get executed when our
 * "beginGameFlow" function is called. We can see that this
 * function does 3 things. The first thing it does is it uses
 * a special "helper function" to disable our startButton. It
 * then uses another special helper function to set the text
 * of our startButton to "Get Ready...". Lastly, it uses one
 * additional helper function to set the page background to
 * the color red. We create "helper functions" to keep our
 * code fairly concise, and easy to read. This prevents us
 * from having really large functions, with lots of details
 * inside them, potentially causing much confusion.
 */
function prepareForGame() {
    disableButton(startButton);
    setButtonText(startButton, "Get Ready...");
    setBackground("red");
}

/**
 * This is the second function invoked/called by our
 * "beginGameFlow" function above. Recall that when this
 * function is called by beginGameFlow, it looks like this:
 *     "runCountDownSequence(startGame);"
 * That call to this function was passing in a "reference" to
 * another function called "startGame". Now, within the
 * runCountdownSequence, we can see that it expects a value to
 * be passed in, and it (internally) refers to whatever is
 * passed in as "onComplete". This is like a nickname the
 * function gives to whatever you pass in, and only the function
 * knows the nickname.
 */
function runCountdownSequence(onComplete) {
    /**
     * We create a list of words that we inded to display.
     * We also create an "index", which word we intend to show
     * next (based on its order in the array). Arrays are what we
     * call "zero-based," so the first item in the array is at
     * index/position 0. The second item is at index/position 1, 
     * and so forth. This array has 3 String values. Strings are
     * what we call words, phrases, sentences, etc., that are
     * wrapped in either single or double quotes. There is also
     * a type of string that is wrapped in ` characters, but we
     * will cover that type of string later. We describe the
     * messages value as "an array of strings".
     */
    const messages = ["READY.", "SET.", "GO!"];
    let index = 0;

    /**
     * When we read lines like this, where a function is being
     * passed a value, it helps to read from the middle out. In
     * this case, we'd start reading "index++" first. What this
     * does is increments the value of index by 1, and gives us
     * the previous value. So if index is 0, it will turn into
     * 1, and we use 0 to retrieve an item from "messages". In
     * this case, messages[0] is "READY.", so "READY." is sent
     * to the setCountdownText function for handling.
     */
    setCountdownText(messages[index++]);

    /**
     * Here we create an "interval," which is code that will
     * run as quickly as we like, for as often as we like. This
     * is common for tasks that need to take place over a period
     * of time. In this case, the first thing we pass into the
     * setInterval call is the function we'd like to run over
     * and over. Our code uses an "anonymous arrow function".
     * It's called "anonymous," because we have not given it a
     * name like we have other functions.
     * 
     * The syntax of an anonymous arrow function is also slightly
     * different than other functions. For example, we don't have
     * to write the keyword "function" at the start. Our function
     * is quite simple. It checks to see if "index" is less than
     * the number of items in our messages array. If it is, then
     * we call setCountdownText on the next item in the array.
     * 
     * If "index" is not less than the number of items in our
     * messages array, then we 1) stop this interval from running
     * any longer (by calling clearInterval), and 2) quickly set
     * the background color to "lightgreen" for 200ms via another
     * helper function. We also give the helper function the name
     * of the next function we'd like to call after the 200ms is
     * completed (i.e., 'onComplete').
     */
    const countdown = setInterval(() => {
        if (index < messages.length) {
            setCountdownText(messages[index++]);
        } else {
            clearInterval(countdown);
            flashBackgroundColor("lightgreen", 200, onComplete);
        }
    }, 1000);
}

/**
 * When the game starts, we call two functions, and set one
 * value. The two functions are resetGameState, and 
 * updateUIForGameStart. The names of these functions tell us
 * more or less what they do. This is what you should aim for
 * when creating your own functions. They should have clear
 * names, and attempt to do a very specific task. We call the
 * setInterval function here again, giving it a reference to
 * our "tick" function, and asking that tick be called every
 * 1000ms (which is 1 second). The setInterval function gives
 * us an identifier that we can use to stop the interval in
 * the future; we store this identifier int he "gameTracker"
 * variable.
 */
function startGame() {
    resetGameState();
    updateUIForGameStart();
    gameTracker = setInterval(tick, 1000);
}

/**
 * This function is called when our game is ending. It does
 * a few small tasks to clean up the game state, stop timers,
 * and communicate the score to the user.
 */
function endGame() {
    isPlaying = false;
    stopTimer();
    updateUIForGameEnd();
    recordScore();
}

/**
 * When the user desires to play again, we have to reset the
 * variables that track the games state. We reset the score
 * to 0, the timeLeft variable to whatever gameTime is, and
 * we indicate via isPlaying that the user is playing again.
 */
function resetGameState() {
    score = 0;
    timeLeft = gameTime;
    isPlaying = true;
}

/**
 * This is our main "game clock" function. It governs whether
 * there is more time to play, or if the game must end due to
 * insufficient time. Each time this function is called, we
 * reduce the value of timeLeft by 1, and update the UI. If
 * we have no remaining time left, we call endGame. Recall that
 * this function is called by the interval created in the
 * startGame function. Is is called every 1000ms.
 */
function tick() {
    timeLeft -= 1;
    updateTimeUI();

    if (timeLeft <= 0) {
        endGame();
    }
}

/**
 * When startGame created the interval timer to call "tick" at
 * the rate of once per second, we received an interval identifer
 * that was stored in the "gameTracker" variable. At the end of
 * the game, we need to stop that interval timer. We do so via
 * the "stopTimer" function, which calls a special function
 * "clearInterval" (provided to us by the browser) that stops an
 * interval from running any longer. We give it the variable that
 * holds our interval ID, and it stops our interval.
 */
function stopTimer() {
    clearInterval(gameTracker);
}

/**
 * Here is where we begin to define our helper functions for
 * updating the interface. First is a function that sets the
 * countdown text (e.g. "10s", "9s", etc.). This function only
 * expects a single input, that being the text we wish to set
 * in the interface. This function then takes that text, and
 * sets it as the value fo the textContent property of our
 * timeDisplay element in the HTML code.
 * @param {string} text - The preferred countdown text
 */
function setCountdownText(text) {
    timeDisplay.textContent = text;
}

/**
 * When startGame is called above, it invokes this function.
 * updateUIForGameStart is responsible for making sure the UI
 * is in the proper state when our game begins. This function
 * calls various helper functiosn to set button text, update
 * the score value displayed to the user, reset the progress
 * bar, and more. Note below that we pass 2 arguments when we
 * call the setButtonText function. That function wants to
 * know which button we want to modify, and what text we want
 * to display in it.
 */
function updateUIForGameStart() {
    setButtonText(startButton, "Game in progress...");
    updateScoreUI();
    updateTimeUI();
    setProgressMax(gameTime);
    updateProgressBar(timeLeft);
}

/**
 * Similarly, when a game is concluded, we need to make sure
 * the interface is in the right state. We re-enable the start
 * button via our "enableButton" helper function, and we set
 * the start button text to "Restart" via our setButtonText
 * helper function.
 */
function updateUIForGameEnd() {
    enableButton(startButton);
    setButtonText(startButton, "Restart");
}

/**
 * Another simple helper function, this exists only to set the
 * current score as the textContent of the scoreDisplay element.
 */
function updateScoreUI() {
    scoreDisplay.textContent = score;
}

function updateTimeUI() {
    timeDisplay.textContent = `${timeLeft}s`;
    updateProgressBar(timeLeft);
}

function setProgressMax(value) {
    progressBar.max = value;
}

function updateProgressBar(value) {
    progressBar.value = value;
}

function setBackground(color) {
    document.body.style.backgroundColor = color;
}

function flashBackgroundColor(color, duration, callback) {
    setBackground(color);
    setTimeout(() => {
        setBackground("");
        if (typeof callback === "function") {
            callback();
        }
    }, duration);
}

function setButtonText(button, text) {
    button.textContent = text;
}

/**
 * Super simple functions which exist to do a single
 * thing: enable or disable a button. Which button? Well,
 * whichever button is given to them. They expect to be
 * given a button reference when called, and they set
 */
function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

/**
 * This is the function that records the score after the
 * game has been played. It starts by calculating the AVG
 * click rate (i.e., score divided by gameTime). This may
 * result in a very long decimal number (e.g., 6.672838…)
 * so we call "toFixed(2)" on the result, which gives us
 * a number with no more than 2 decimal places shown.
 * 
 * We then create a <li> element, set its text content,
 * and lastly append that <li> to the scoreList element.
 * 
 * Earlier I shared that strings are wrapped in single or
 * double quotes, but that there was a third type which
 * is wrapped in ` characters—we can see this type used
 * in the code below. These are called Template strings,
 * and they let us put variables names within, which will
 * be replaced by their values when the string is built.
 * It is important that variables names be wrapped in 
 * ${ and } to signify we wish to include their value.
 */
function recordScore() {
    const avgClickRate = (score / gameTime).toFixed(2);
    const time = getCurrentTime();
    const li = document.createElement("li");
    li.textContent = `${time} - ${score} clicks (${avgClickRate} clicks/sec)`;
    scoreList.appendChild(li);
}

/**
 * This is a very simple function which creates a Date
 * object (for determining things like which day of the
 * week it is, what is the time of day, etc.). We can use
 * this Date object to get a "locale time string," which
 * is the current time formatted in a way that is familiar
 * to the user's region. Americans will see something like
 * "01:23 PM", but other visitors might see "13:23" instead.
 */
function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

/**
 * This is where the logic for handling clicks exists. It
 * first checks to see if the game is in the playing state.
 * If the game is currently not being played (e.g., maybe
 * the time ran out, and the user is simply reviewing their
 * score), then we "return", meaning we stop running the
 * function immediately. If isPlaying is true, however, we
 * do not return, but rather proceed to call the next few
 * lines. These lines increment the score by 1, update the
 * UI to show the new score, and quickly flash a new 
 * background color to indicate a click took place. We also
 * pass in 100 (meaning 100ms, or 1/10th of a second) as the
 * second argument.
 */
function maybeCountClick() {
    if (!isPlaying) return;

    score++;
    updateScoreUI();

    flashBackgroundColor("honeydew", 100);
}

/**
 * Here is where we tell the game what to do when the
 * user clicks anywhere on screen. Since we don't know if
 * the game is running or not, we named our function
 * "maybeCountClick". We are listening for click events
 * anywhere on the document itself, and calling our
 * "maybeCountClick" function when a click is detected.
 */
document.addEventListener("click", maybeCountClick);
