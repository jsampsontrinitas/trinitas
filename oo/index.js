// Because this script was marked as [type='module'] in the index.html file, we
// can use `import` statements to pull code in from other scripts. By using the
// module approach, our project files now remain more organized, making them
// easier to navigate, extend, and maintain.
import Tank from "./classes/Tank.js";

// We're using `const` to create variables `armyTank` and `pinkTank`. Because
// we used `const` (and not `let`), we won't be able to assign a new value to
// either of theve variables without causing an error. This protects us from
// accidentally overwriting variables.
const armyTank = new Tank({ rounds: 5, color: "green" });

// While the `pinkTank` variable is unused at this point (unlike the `armyTank`
// cariable which was used to call `armyTank.render()`), it serves as a good
// example of how we can flexibly use the Tank constructor to provide only the
// values we'd like to use during object creation. For the `armyTank`, we told
// the constructor to give us 5 rounds by default, and use "green" as the color
// of the tank itself. Here we had no request for how many `rounds` we'd like,
// which means our `pinkTank` will get the default (see Tank.js, line 28). We
// do specify that we'd like the color "pink" to be used, however. This config
// will be provided to the Tank constructor, which will provide it to the
// Automobile constructor, which will provide it ultimately to the Machine
// constructor, which will use it to replace the otherwise default color.
const pinkTank = new Tank({ color: "pink" });

// The `render` method demonstrates another important detaila about
// object-oriented programming. You can check Tank.js for a render method, but
// you won't find one at this time. You can check Automobile.js for a render
// method, but you won't find one there either. Instead, the render method is
// added by the Machine.js file, as part of the Machine class. Because Tank is
// a type of Automobile, which itself is a type of Machine, Tank therefore
// "inherits" the render method.
armyTank.render();

// const vehicle = new Automobile( 0.5 );
// const faxmachine = new Machine( 500, 53, 32 );

// We're creating a function to handle the logic to begin intercepting
// keyboard events (e.g., pressing the W or Up Arrow keys).
function setupKeyBinding() {
  // Inside our setupKeyBinding function we create two helper functions
  // that really only exist to perform a task for the setupKeyBinding
  // function, and for this reason it's okay to define them inside of
  // the setupKeyBinding function (where no other code could call them).
  function handleKeyUp(event) {
    // This "event" object is a KeyboardEvent object, documented online
    // at https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
    // We log the `code` property just to verify that everything works.
    console.log(event.code);
  } // END handleKeyUp

  // Similar to our `handleKeyUp` function above, this function exists
  // to handle "keydown" events that occur within the document.
  function handleKeyDown(event) {
    // We log the `event.code` to verify that everything works
    console.log(event.code);

    // We then compare (using == importantly) to "KeyW" to see if the
    // W key was pressed. If the condition is _true_, then the block
    // that follows will be executed. By "block", I'm referring to the
    // code that exists within the { and } characters.
    if (event.code == "KeyW") {
      // We call the driveForward method (inherited from Automobile)
      armyTank.driveForward();
      // We then call the update method (inherited from Machine)
      armyTank.update();
      // The "implementation" (i.e., the inner-workings) of the
      // driveForward method updates the `location.x` property, so
      // we log the value of this property to verify everything works.
      console.log(armyTank.location.x);
    } // END if
  } // END handleKeyDown

  // These are the actual event-listener bindings. We tell the page
  // that on every "keyup" event that occurs within the document, we
  // want to run the `handleKeyUp` function. Likewise, we tell the
  // page that it should invoke `handleKeyDown` for "keydown" events.
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("keydown", handleKeyDown);
  
} // END setupKeyBinding

// Our setupKeyBinding function has to be called, so we call it here
setupKeyBinding();
