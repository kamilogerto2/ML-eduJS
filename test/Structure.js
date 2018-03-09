const assert = require('assert');
const Leaf = require('../lib/structure/leaf');
const Node = require('../lib/structure/node');

const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
];
const labels = ['colors', 'number'];


describe('Structure elements', function() {
    describe('Leaf', function() {
        it('should create leaf element', function() {
            const leaf = new Leaf([{'Orange': 1}]);
            assert.equal(leaf.finalClass[0].Orange, 1);
        });
    });

    describe('Node', function() {
        it('should create node element', function() {
            const node = new Node(learningData);
            assert.equal(node.data[0][0], 'Green');
        });
    });
});