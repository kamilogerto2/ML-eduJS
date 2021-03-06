const C45 = require('../lib/algorithms/C45');

// define learning data
const learningData = [
    ['Green', 8, 'Apple'],
    ['Orange', 1 , 'Grape'],
    ['Orange', 6, 'Orange'],
    ['Purple', 7, 'Plum'],
    ['Red', 5, 'Orange'],
    ['Red', 7, 'Orange'],
    ['Red', 9, 'Apple'],
];

//define feature labels
const labels = {
    color: {
        type: 'string',
        order: 0
    },
    taste: {
        type: 'numeric',
        order: 1
    }
};

// init and run algorithm, turn on descriptive mode and with prunning
const options = {
    descriptive: true,
    prune: true
};
const cartAlgorithm = new C45(options);
const tree = cartAlgorithm.buildTree(learningData, labels);

// print tree in console
tree.printTree();

// check it ;)
const prediction = tree.classify(['?', '?', 'Orange']);
console.log(`\n Prediction for our test sample:`);
console.log(prediction);
