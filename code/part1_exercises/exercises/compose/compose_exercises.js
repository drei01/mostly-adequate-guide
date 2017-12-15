require('../../support');
var _ = require('ramda');
var accounting = require('accounting');

// Example Data
var CARS = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
];

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.
var in_stock = _.prop('in_stock');

var isLastInStock = _.compose(in_stock, _.last);

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car
var name = _.prop('name');

var nameOfFirstCar = _.compose(name, _.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition
var _average = function(xs) {
    return reduce(add, 0, xs) / xs.length;
}; // <- leave be

var dollar_value = _.prop('dollar_value');
var dollar_values = _.map(dollar_value);

var averageDollarValue = _.compose(_average, dollar_values);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

var _underscore = replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
var name = _.prop('name');

var sanitizeNames = _.map(_.compose(_underscore, _.toLower, name));

// Bonus 1:
// ============
// Refactor availablePrices with compose.

var availableCars = _.compose(_.filter(_.prop('in_stock')));
var formatDollarValue = _.compose(accounting.formatMoney, _.prop('dollar_value'));
var joinComma = _.join(', ');

var prices = _.compose(joinComma, _.map(formatDollarValue));

var availablePrices = _.compose(prices, availableCars);

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip()
var sortedByHorsePower = _.sortBy(_.prop('horsepower'));
var concatFlipped = _.flip(_.concat);

var fastestCar = _.compose(concatFlipped(' is the fastest'), _.prop('name'), _.last, sortedByHorsePower);

module.exports = {
    CARS: CARS,
    isLastInStock: isLastInStock,
    nameOfFirstCar: nameOfFirstCar,
    fastestCar: fastestCar,
    averageDollarValue: averageDollarValue,
    availablePrices: availablePrices,
    sanitizeNames: sanitizeNames,
};
