// Arrays start and end with [ square brackets ]
const jon = [ "Jon", "Sampson", 15 ]; // An array of 3 values
const brandon = [ "Brandon", "Janksy", 14 ] // Two Strings and a Number
// We create an array of students that contains variables and array literals
const students = [ jon, brandon, [ "Jackson", "Cowart",  15 ] ];

function printStudentList () {
    for ( const student of students ) {
        const firstName = student[0];
        const age = student[2];
        const futureAge = 10 + age;

        console.log( firstName + " will be " + futureAge + " in 10 years" );
    }
}

printStudentList();

const addresses = [
    [ "123", "Main Street", "Pensacol", "FL" ],
    [ "527", "Pearl Avenue", "Milton", "TN" ],
];