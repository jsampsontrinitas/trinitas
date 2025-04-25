/*
 * JAVASCRIPT CONCEPTS COVERED IN THIS FILE
 * ----------------------------------------
 *
 * JAVASCRIPT FEATURES:
 * - DOM Selection: Using querySelector to find elements in the document
 * - Event Handling: Adding event listeners for user interactions
 * - Arrow Functions: Using modern syntax for callback functions
 * - Conditional Logic: Testing conditions with if statements
 * - Element Property Manipulation: Changing CSS styles dynamically
 * - CSS Class Manipulation: Adding/removing classes with classList
 * - Computed Style Access: Using getComputedStyle to read current CSS values
 * - Type Conversion: Using parseFloat to convert string values to numbers
 * - Array Methods: Using includes() to check for value existence
 * - Event Propagation: Leveraging the DOM event bubbling system
 * - Early Returns: Using return statements to exit functions early
 * - Variable Declarations: Using const for immutable references
 * 
 * GENERAL PRINCIPLES/IDEAS:
 * - Event-Driven Programming: Responding to user interactions
 * - Code Organization: Creating logical blocks of functionality
 * - User Interface Interaction: Creating interactive visual elements
 * - Variable Scoping: Using block scope for variables
 * - Performance Optimization: Minimizing DOM queries
 * - Code Readability: Using descriptive variable names and comments
 * - Defensive Programming: Checking conditions before performing operations
 * - Code Reusability: Creating modular event handlers
 * - Declarative Programming: Using toggles instead of imperative state changes
 * - Progressive Enhancement: Adding JavaScript functionality to CSS animations
 * - Unobtrusive JavaScript: Separating behavior from structure and presentation
 * - Animation Control: Using JavaScript to trigger CSS animations
 */

// We start with a `const` reference to our `<div class='box'>` element.
// We use `const` to avoid accidentally overwriting the reference in our code.
// Because we used `document.querySelector` (and not `querySelectorAll`), we
// can be sure the method will return only ONE element reference, or nothing
// at all. Had we used `querySelectorAll`, we might have received a "node list",
// which would contain all elements that match the selector. Our DOM doesn't
// have any more elements that match this selector, but we still don't want a
// node list. NodeList is similar to an Array in that it potentially holds
// many references. We just want a direct reference to a single element.
const box = document.querySelector(".box")

// Listen for "click" events on the box element
box.addEventListener("click", (event) => {
  // Create an alias for the "event.target" so we type less
  // Note: We use the standard "target" property instead of the deprecated "srcElement"
  const element = event.target
  // Check to see if the event originated from a ".face" element
  if (element.matches(".face")) {
    // Determine the current opacity of the element, converted to a decimal number
    const opacity = parseFloat(getComputedStyle(element).opacity)
    // Set opacity. If current is less than 50%, we set to 85%, otherwise to 10%
    element.style.opacity = opacity < 0.5 ? 0.85 : 0.1
  }
  // Nothing is explicitly returned by this function
})

// Listen for "change" events at the document level. Events do not
// only occur on the element to which they are associated. They echo
// throughout the document so that you can handle them via ancestors.
// "Change" events are fired when the checkboxes are clicked on/off.
document.addEventListener("change", (event) => {
  // We get the [ID] attribute value for the event's source element
  // Using the standard "target" property instead of the deprecated "srcElement"
  const id = event.target.id
  // We check to see if the value is in an array of expected values.
  // If the ID value is NOT in our array, we `return` immediately.
  if (["pulsate", "spin", "labels"].includes(id) == false) {
    return
  }
  // If we reach this line, that means the "change" event belongs
  // to an element whose [ID] attribute has a value that exists in
  // our array literal of expected values. Those values in the
  // array literal are also CSS class names that we use to control
  // animations and more on the cube. As such, we can toggle the
  // value of the [ID] on/off as a class name, and see its effect.
  box.classList.toggle(id)
  // This function has no explicit return value
})