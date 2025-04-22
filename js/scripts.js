
// This function is declared with a single parameter (i.e., phrase)
function say_phrase (phrase) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    speechSynthesis.speak(utterance);
}

// This is a function called "logical_fallacies". It has two parameters: the first of which is the appeal_to_authority_example, and the second is the num_of_times_to_print.
function logical_fallacies(appeal_to_authority_example, num_of_times_to_print) {
    for ( let i = 0; i < num_of_times_to_print; i++ ) {
        console.log("An example of an appeal to authory is: " + appeal_to_authority_example);
    }
}

logical_fallacies("Listen to me, for I have the badge of green justice!", 3);

const phrases = [
    "Hello World",
    "What is your name?",
    "This is the Trinitas code club.",
    "The weather is nice today."
];

const pitcher = {
    name: "Jackson",
    pitch() {
        console.log(this.name + " " + "throws a fast ball");
    }
};

// This is a function called "printPhrasesToPage", and it expect a single array as the only argument/parameter. The array will be referenced as "inputPhrases".
function printPhrasesToPage (inputPhrases) {
    // This is a "for...of" (as opposed to "for...in") loop.
    for ( const phrase of inputPhrases ) {
        // Create a list item ("DOM programming")
        const listItem = document.createElement("li"); // <li>...</li>
        // We set the text content of the list item to whatever the phrase is.
        // Methods are functions that belong to objects (e.g., Math.random() )
        listItem.textContent = phrase + " " + Math.floor( 800 * Math.random() );
        // And lastly we append the new list item to the <body> element
        document.body.append(listItem);
    }
}

// We are now calling the function with a single argument; an array of names
printPhrasesToPage([ "Jon Anthony", "Brandon Jansky", "Jackson Cowart" ]);

// This is a function named "foo"; it has no arguments (i.e., the parens have nothing between them). Its "body" is everything within the opening and closing curly braces (i.e., { and }).
function foo () {
    phrases.forEach(say_phrase)
}

// This is an anonymous arrow function, assigned to a variable called "foo2". It's anonymous because there is no name declared to the right of the assignment operator. This arrow function has curly braces, which aren't required in this case.
const foo2 = () => {
    phrases.forEach(say_phrase);
}

// This is another anonymmous function but without curly braces. It has an implicit "return" built in, of whatever is produced by its body (phrases.forEach in this case).
const foo4 = () => phrases.forEach(say_phrase);


document.onclick = () => phrases.forEach(say_phrase);

