'use strict';

/*
//////////////////////////////////////////////////////////////
// More Closure Examples

// Example 1
let f;

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;

  f = function () {
    console.log(b * 2);
  };
};

// the variable environment of g is no longer there, but f function closed over that variable environment and therefore it is able to access the "a" variable
g();
f();

console.dir(f);

// Reassigning f function by h function
h();
f();

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // closure has priority over scope chain which is obvisous

  // the callback function was able to use all the variables that were in the variable environment in which it(callback function) was created, this is a clear sign of a closure being created;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
*/

/*
//////////////////////////////////////////////////////////////
// Closures

// we don't create closures manually, we need to recognize those situations;
// the environment in which the "secureBooking" function was created is no longer active, it is in fact gone, but still the booker function somehow continues to have access to the variables that were present at the time that the function was created, and in particular passengerCount variable, so that's exactly what the closure does, it makes a function remember all the variables that existed at the function's birthplace essentially, we can imagine that secure booking as being the birthplace of the function that is below, so of the booker function, function remembers everything at it's birthplace, by the time it was created, and this cannot simply be explained with the scope chain alone;
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

// any function always has access to the variable environment of the execution context in which the function was created, now in the case of booker, this function was created it was born in the execution context of secureBooking function which was popped off the stack previously, booker function will get access to this variable environment which contains the passengerCount variable, and this is how the function will be able to read and manipulate the passengerCount variable, the closure is basically the variable environment attached to a function exactly as it was at the time and place that the function was created, so in a sense, the scope chain is actually preserved through the closure, even when a scope has already been destroyed, because it's execution context is gone, this means that even though the execution context has actually been destoyed, the variable environment somehow keeps living somewhere in the engine, now we can say that the booker function closed over it's parent scope or over it's parent variable environment and this include all function arguments, even though in this example, we don't have any, and now this attached or closed over variable environment stays with the function forever, it will carry it around and be able to use it forever, to make it a bit more digestible(усваиваемый) we can also say that thanks to the closure a function does not lose connection to variables that existed at the function's birthplace, that's a bit more intuitive;

booker(); // function attempts to increase the passengerCount variable, however this variable is not in the current scope, and so JavaScript will immediately look into the closure, and see if it can find the variable there, and it does this even before looking at the scope chain, for example, if there was a global passengerCount variable set to 10, it would still first use the one in the closure, so the closure basically has priority over the scope chain, and so after running this function, the passengerCount becomes one, this message is logged and then the execution context is popped off the stack, then execution moves to the next line, we get a new execution context and a closure is still there, still attached to the function and the value is still one and so now this function executes, increasing the passengerCount to two, and logging a message again;
booker();
booker();

console.dir(booker);
*/

/*
//////////////////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

// regular function call
const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// many times we need to protect our variables from being accidentally overwritten by some other parts of the program, or even with external scripts or libraries
// IIFE (Immediately Invoked Function Expression)
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);

// Arrow function IIAF??
(() => console.log('This will ALSO never run again'))();

// Block-scope ES6
// IIFE are not that used anymore because if all we want is to create a new scope for data privacy, all we need to do is to just create a block, there's no need to creating a function to create a new scope, unless we want to use var for our variables, but we already know, we probably shouldn't do that, now on the other hand, if what you really need, is to execute a function just once, then the IIFE pattern is still the way to go, even now with modern JavaScript.
{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);
*/

/*
//////////////////////////////////////////////////////////////
// The call and apply Methods

// SOLVE we cannot use arrow function by using call, apply methods, it simply assign the "this" keyword to the window object, it's like override it

const book = function (flightNum, name) {
  console.log(this); // initially the "this" keyword is undefined(in strict mode)

  console.log(
    `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
  );
  this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); // SOLVE enhancement btw "name" - property is gonna be the same exact name as the variable name
};

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {},
};

book.call(lufthansa, 239, 'Ivan Skinder');
book.call(lufthansa, 635, 'Pavel Skinder');
// const book = lufthansa.book; // function value

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Does not work with the "this" properly, so we might to set the "this" keyword manually by using call, apply or bind method to the function itself
// book(23, 'Sarah Williams');

// Call Method
// this method calls the function with a given "this" value and arguments provided individually;
book.call(eurowings, 23, 'Sarah Williams'); // function is really just an object and objects have methods, therefore functions can have methods too, and the "call" method is one of them, the first argument is exactly what we want the this keyword to point to.
book.call(lufthansa, 228, 'Mary Cooper');

console.log(lufthansa);
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply Method
// this method calls the specified function with a given "this" value and arguments provided as an array;
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); // this apply method is not that used anymore in modern JavaScript

// we can do the exact same thing, so jonas prefer to use call method and then spread operator out the arguments from an array like this
book.call(swiss, ...flightData);
console.log(swiss);

// so in summary: we now have yet another tool in our toolbox here, and this one is one that allows us to explicitly define the this keyword in any function that we want, but there is actually yet another method which allows us to do the same thing and that's the bind method, it's more important than the call and apply methods;

//////////////////////////////////////////////////////////////
// Bind Method
// bind allows us to set manually the "this" keyword for any function call, but it doesn't immediately call the function, instead it returns a new function where the this keyword is bound(привязано);
// book.call(eurowings, 23, "Sarah Williams");

const bookEW = book.bind(eurowings); // it won't call the book function, instead it will return a new function, where the "this" keyword will always be set to Eurowings in this case
const bookLH = book.bind(lufthansa); // similar, but with the "this" keyword would be lufthansa
const bookLX = book.bind(swiss); // similar, but with the "this" keyword would be swiss

bookEW(23, 'Steven Williams');

// this bookEW23 function now only needs the name, because the number was already preset here in the bind method;
const bookEW23 = book.bind(eurowings, 23); // so this allows us to set in stone, certain arguments and so this function, the resulting function, then becomes even simpler, so all we have(need) to pass in is the passenger name, and then everything else basically happens automatically; and by the way what we did here, so basically specifying parts of the argument beforehand is actually a common pattern called partial application, so essentially, partial application means that a part of the arguments of the original function are already applied, so which means, already set, and so that's exactly what the bookEW23 function is, it's essentially the book function but with 23 already predefined and the "this" keyword with the value of eurowings;

bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listener
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); // initially it points to lufthansa because the object(lufthansa) is calling the method(buyPlane)

  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // we learned that in an event handler function, the "this" keyword always points to the element on which that handler is attached to, but right now it's not our purpose;

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // SOLVE so what we really want to is to manually define the "this" keyword, so we need to pass in a function and not to call it, and so we already know that the "call" method calls the function and so that's not what we need, and so therefore we use bind because we know that the bind is gonna return a new function with the "this" predefined value which is gonna be lufthansa object because we specified that lulw, arguments are optional;

// Partial Application(which means is that we can preset parameters)
// many times we are not even interested in the "this" keyword, but we still use the bind method just to predefine the arguments;

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 100)); // 10%, result is 110

const addVAT = addTax.bind(null, 0.23); // the "this" keyword set to null and rate(in case order of our arguments) is set to 0.23;
// const addTax = value => value + value * 0.23; // similar as above

console.log(addVAT(200)); // need to keep in mind that order of the arguments then is important, when we are using the bind method onto addTax
console.log(addVAT(23));

// Challenge
const addVATRate =
  (rate = 0.23) =>
  value =>
    value + value * rate;

const addVAT2 = addVATRate(); // default value of rate is 0.23
console.log(addVAT2(200)); // 246
console.log(addVAT2(23)); // 28.29

// SOLVE is the same as above, but this is obviosly unnecessary
// const addTaxRate = rate => value => value + value * rate;

// const addTAXValue = addTaxRate(0.1);
// console.log(addTAXValue(100)); // 110
*/

/*
//////////////////////////////////////////////////////////////
// Functions Returning Functions

// some tests about closures
const textFunc = (a) => {
    let sum = 0;
    return function (b) {
        sum += a + b;
        return sum;
    }; 
};

const x = textFunc(2);
x(2); // 4
x(2); // 8
x(4); // 14
x(6); // 22


const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};


const greeterHey = greet('Hey');
greeterHey('Ivan');

// and of course we could do it all in one go
greet('Hello')('Ivan');

// arrow function syntax, similar as above
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Ivan');
*/

/*
//////////////////////////////////////////////////////////////
// Functions Accepting Callback Functions
// own example
const addElementToTheEnd = function (array, element) {
  return array.push(element); // new length of the array
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
checkIn(flight, jonas); // we are passing a reference to the function, but not by reference(example C++) - that's an important distinction :-D, 
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
  // ES5(not exactly as these, because there weren't shorthand since ES6, it's like newest features, not sure about that)
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

// ಥ_ಥ
createBooking('LH123', undefined, 228); // setting undefined is the same thing as not even setting it, so this is how we basically skip a default parameter that we want to leave at its default
*/
