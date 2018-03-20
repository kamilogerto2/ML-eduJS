const C45 = require('./C45');
const TreeBag = require('../structure/treeBag');

module.exports = class RandomForest {
    constructor(options) {
        const defaultOptions = {
            treesCount: 200,
            subsetItemsCount: 100,
            featureSubset: 5,
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
        let randomLabels = [];
        let trees = [];
        const dataLength = data.length;

        for(let treeNumber = 0; treeNumber < this.options.treesCount; treeNumber++) {
            randomSet = [];
            randomLabels = this.getRandomFeatures(labels);

            for(let itemNumber = 0; itemNumber < this.options.subsetItemsCount; itemNumber++) {
                randomSet.push(data[parseInt(this.getRandomNumber(0, dataLength))]);
            }

            trees.push(this.constructTree(randomSet, randomLabels))
        }

        return new TreeBag(trees, labels, 'Bagging');
    }

    getRandomFeatures(labels) {
        let randomLabels = {};
        let randomIndex = 0;
        let indexes = [];

        while(indexes.length <= this.options.featureSubset) {
            randomIndex = parseInt(this.getRandomNumber(0, Object.keys(labels).length));
            if(indexes.indexOf(randomIndex) === -1) {
                indexes.push(randomIndex);
                for(let label in labels) {
                    if(labels.hasOwnProperty(label) && labels[label].order == randomIndex) {
                        randomLabels[label] = labels[label];
                    }
                }
            }
        }

        return randomLabels;
    }

    constructTree(set, labels) {
        return this.learningAlgorithm.buildTree(set, labels);
    }

    getRandomNumber(a, b) {
        return Math.random() * ( b - a ) + a;
    }
};
