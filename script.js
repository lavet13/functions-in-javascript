'use strict';
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
  // numPassengers ||= 1; // catch 0, "", null, undefined etc. falsy values, and assign default value of 1 to a variable
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
