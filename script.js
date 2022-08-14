'use strict';

/*
// own example
const addElementToTheEnd = function (array, element) {
  return array.push(element);
};
const deleteLastElement = function (array) {
  return array.pop(); // deleted element
};

const processingWithData = function (array, fn, element = -1) {
  if (element !== -1) fn(array, element);
  else fn(array);
  console.log(`array with length of ${array.length}`);
  console.log(array);
};

processingWithData([1, 2, 3, 4], addElementToTheEnd, 228);
processingWithData([5, 6, 7, 8], deleteLastElement);


const oneWord = function (str) {
  return str.replace(/\s+/g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function(because it operates at a higher-level of abstraction, leaving the low level details to low level functions)
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); // property of the function, so basically it's behave like all the other "type" of objects, such as arrays, objects, maps, sets etc.
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
// high5 function is the more lower level of abstraction
const high5 = function () {
  console.log('✋');
};

// addEventListener is the higher order function with the high level of abstraction
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// so big advantage of callback functions is that it makes it easy to split up our code into more reusable and interconnected parts, where all the functionality is nicely split up into their own functions and that itself is really helpful, but there is a second and way more important advantage which is the fact that callback functions allow us to create abstraction, so basically what abstraction means is that we hide the detail of some code implementation because we don't really care about all that detail, and this allows us to think about problems at a higher more abstract level, the transformer function is really only concerned with transforming the input string itself. But no matter how that transforming itself actually works. So it's basically delegating the string transformation to the other lower level of functions, which are these two.
*/

/*
/////////////////////////////////////////
// First-Class and Higher-Order Functions
// first-class functions is just a feature, that a programming language either has or does not have, All it means is that all functions are values, there are no first-class functions in practice, it's just a concept, there are however higher order functions in practice, which are possible because the language supports first-class functions. So it's a subtle difference.
*/

/*
/////////////////////////////////////////
// How Passing Arguments Works_ Value vs. Reference

const flight = 'LH234';

const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 238974293874,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 238974293874) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);

// Is the same as doing...
const flightNum = flight;
const passenger = jonas; // as we already know, when we try to copy an object, we are really only copying the reference to that object in the memory heap, but they both point to the same object in memory, and that's exactly what is also happening with Jonas object, as we pass it into the checkIn function where it's called passenger, as we are manipulating the passenger object, it is exactly the same as manipulating the Jonas object, once again because they both are the same object in the memory heap;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas); // we are passing a reference to the function, but not by reference - that's an important distinction :-D
console.log({ flight, jonas });
*/

/*
/////////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers ||= 1; // catch 0, "", null, undefined etc., so it goes to the second operand to assign a default value
  // price ||= 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 10);
createBooking('LH123', 20);

// I CANNOT DO THIS ಥ_ಥ
createBooking('LH123', undefined, 228); // setting undefined is the same thing as not even setting it, so this is how we basically skip a default parameter that we want to leave at its default
*/
