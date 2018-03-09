const CART = require('../lib/algorithms/CART');

// define learning data
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
    ['Orange', 'Sweet', 'Orange'],
    ['Purple', 'Bitter', 'Plum'],
];

//define feature labels
const labels = ['colors', 'taste'];

// init and run algorithm
const cartAlgorithm = new CART();
const tree = cartAlgorithm.buildTree(learningData, labels);

// check it ;)
const prediction = tree.classify(['Purple', 'Bitter', 'Plum']);
console.log(prediction);
