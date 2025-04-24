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

// There are a couple types of function syntaxes we can use:
// 1. The traditional OG style:
//      function (student) { return student[2] >= 15 }
// 2. The newer array function style:
//      (student) => { return student[2] >= 15 }
// 3. Array function swith implicit returns
//      (student) => student[2] >= 15
// 4. Array function with shorter argument names
//      (s) => s[2] >= 15

// Let's find all students that are 15 or older.
const fifteenPlus = students.filter((student) => student[2] >= 15);
// In studentInitials we grab the first letter from the first/last
// names and return the combined first letters of each
const studentInitials = students.map((student) => student[0][0] + student[1][0] );
const futureAges = fifteenPlus.map((student) => 10 + student[2]);

// for ( const student of students ) {
//     // Zero-based index (zero is the first index/location in a list, always)
//     const age = student[2];
//     if ( age >= 15 ) {
//         fifteenPlus.push(student);
//     }
// }

console.log(fifteenPlus, studentInitials, futureAges);

// printStudentList();

const addresses = [
    [ "123", "Main Street", "Pensacol", "FL" ],
    [ "527", "Pearl Avenue", "Milton", "TN" ],
];