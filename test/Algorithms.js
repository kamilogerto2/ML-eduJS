const assert = require('assert');
const CART = require('../lib/algorithms/CART');
const ID3 = require('../lib/algorithms/ID3');
const C45 = require('../lib/algorithms/C45');

const learningData = [
    ['Green', 3, 'Apple'],
    ['Yellow', 3, 'Apple'],
    ['Red', 1, 'Grape'],
    ['Red', 1, 'Grape'],
    ['Yellow', 3, 'Lemon'],
];

describe('Algorithms', function() {
    describe('CART', function() {
        const cartAlgorithm = new CART();
        const labels = ['colors', 'number'];

        it('algorithm object should be created', function() {
            assert.equal(cartAlgorithm.type, 'CART');
        });

        it('tree should be built without errors', function() {
            assert.equal(typeof cartAlgorithm.buildTree(learningData, labels), 'object');
        });

        it('tree should predict correct data', function() {
            tree = cartAlgorithm.buildTree(learningData, labels);
            assert.equal(tree.classify(['Red', 1, 'Grape'])[0].hasOwnProperty('Grape'), true);
        });
    });

    describe('ID3', function() {
        const id3Algorithm = new ID3();
        const labels = ['colors', 'number'];

        it('algorithm object should be created', function() {
            assert.equal(id3Algorithm.type, 'ID3');
        });

        it('tree should be built without errors', function() {
            assert.equal(typeof id3Algorithm.buildTree(learningData, labels), 'object');
        });

        it('tree should predict correct data', function() {
            tree = id3Algorithm.buildTree(learningData, labels);
            assert.equal(tree.classify(['Red', 1, 'Grape'])[0].hasOwnProperty('Grape'), true);
        });
    });

    describe('C4.5', function() {
        const c45Algorithm = new C45();
        const labels = {
            colors: {
                type: 'string',
                order: 0
            },
            number: {
                type: 'string',
                order: 1
            }
        };

        it('algorithm object should be created', function() {
            assert.equal(c45Algorithm.type, 'C45');
        });

        it('tree should be built without errors', function() {
            assert.equal(typeof c45Algorithm.buildTree(learningData, labels), 'object');
        });

        it('tree should predict correct data', function() {
            tree = c45Algorithm.buildTree(learningData, labels);
            assert.equal(tree.classify(['Red', 1, 'Grape'])[0].hasOwnProperty('Grape'), true);
        });
    });
});