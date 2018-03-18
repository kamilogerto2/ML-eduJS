const C45 = require('./C45');
const TreeBag = require('../structure/treeBag');

module.exports = class Bagging {
    constructor(options) {
        const defaultOptions = {
            treesCount: 200,
            subsetItemsCount: 300,
            learningMethod: 'C45',
        };

        this.options = Object.assign({}, defaultOptions, options);
        this.learningAlgorithm = null;

        this.initAlgorithm(this.options.learningMethod)
    }

    initAlgorithm(type) {
        switch (type) {
            case 'C45':
                this.learningAlgorithm = new C45();
                break;
        }
    }

    buildTreesBag(data, labels) {
        let randomSet = [];
        let trees = [];
        const dataLength = data.length;

        for(let treeNumber = 0; treeNumber < this.options.treesCount; treeNumber++) {
            randomSet = [];

            for(let itemNumber = 0; itemNumber < this.options.subsetItemsCount; itemNumber++) {
                randomSet.push(data[parseInt(this.getRandomNumber(0, dataLength))]);
            }

            trees.push(this.constructTree(randomSet, labels))
        }

        return new TreeBag(trees, labels, 'Bagging');
    }

    constructTree(set, labels) {
        return this.learningAlgorithm.buildTree(set, labels);
    }

    getRandomNumber(a, b) {
        return Math.random() * ( b - a ) + a;
    }
};
