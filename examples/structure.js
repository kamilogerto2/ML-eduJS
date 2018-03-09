const Node = require('../lib/structure/node');
const Tree = require('../lib/structure/tree');

// define our training set
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
];

// define list of features in our training set
const labels = ['colors', 'taste'];

// create new node
const node = new Node(learningData);

// define question/feature which determine how to divide set of data
node.defineQuestion('colors');

// add leafs with specific predictions
node.addLeaf([{'Apple': 1}], 'Green');
node.addLeaf([{'Grape': 1}], 'Orange');

// create tree in the base of created node
const tree = new Tree(node, labels, 'ID3');

// print tree
tree.printTree();

// save tree in pretty form
tree.savePureTree('pretty.json');

// save tree in readable by library form
tree.saveFullTree('full.json');