function say(phrase) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 5;
    speechSynthesis.speak(utterance);
}

const speakButton = document.querySelector("#sayPhrase");
const phraseInput = document.querySelector("#phrase");

speakButton.addEventListener("click", function () {
    say(phraseInput.value);
});