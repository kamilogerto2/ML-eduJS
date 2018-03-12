const C45 = require('../lib/algorithms/C45');

// define learning data
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
    ['Orange', 'Sweet', 'Orange'],
    ['Purple', 'Bitter', 'Plum'],
];

//define feature labels
const labels = {
    color: {
        type: 'string',
        order: 0
    },
    taste: {
        type: 'string',
        order: 1
    }
};

// init and run algorithm, turn on descriptive mode
const descriptiveMode = true;
const cartAlgorithm = new C45(descriptiveMode);
const tree = cartAlgorithm.buildTree(learningData, labels);

// check it ;)
const prediction = tree.classify(['Purple', 'Bitter', 'Plum']);
console.log(`\n Prediction for our test sample:`);
console.log(prediction);
