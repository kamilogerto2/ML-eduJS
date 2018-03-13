const CART = require('../lib/algorithms/CART');

// define learning data
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
    ['Orange', 'Sweet', 'Orange'],
    ['Purple', 'Bitter', 'Plum'],
];

//define feature labels
const labels = ['color', 'taste'];

// init and run algorithm, turn on descriptive mode
const options = {
    descriptive: true,
};
const cartAlgorithm = new CART(options);
const tree = cartAlgorithm.buildTree(learningData, labels);

// check it ;)
 const prediction = tree.classify(['Purple', 'Bitter', 'Plum']);
 console.log(`\n Prediction for our test sample:`);
 console.log(prediction);
