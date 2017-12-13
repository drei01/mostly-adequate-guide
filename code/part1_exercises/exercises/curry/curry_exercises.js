require('../../support');
var _ = require('ramda');

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function

var words = _.curry(function(str) {
    return split(' ', str);
});

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = _.map(words);

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

var matchQ = _.curry(function(x) {
    return match(/q/i, x);
});

var filterQs = _.curry(function(xs) {
    return filter(matchQ, xs);
});

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
var _keepHighest = _.curry(function(x, y) {
    return x >= y ? x : y;
});

// REFACTOR THIS ONE:
var max = _.curry(function(xs) {
    return reduce(_keepHighest, -Infinity, xs);
});

// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
var slice = _.curry(function(from, to, array) {
    return array.slice(from, to);
});

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b']
var take = _.curry(function(n, array) {
    return slice(0)(n)(array);
});

module.exports = {
    words: words,
    sentences: sentences,
    filterQs: filterQs,
    max: max,
    slice: slice,
    take: take,
};
