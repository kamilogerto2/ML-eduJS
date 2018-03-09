const CART_Classifier = require('../classifiers/CART');
const ID3_Classifier = require('../classifiers/ID3');

module.exports = class Tree {
    constructor(initNode, labels, type) {
        this.tree = initNode;
        this.labels = labels;

        switch(type) {
            case 'CART':
                this.classifier = new CART_Classifier(this.tree, labels);
                break;
            case 'ID3':
                this.classifier = new ID3_Classifier(this.tree, labels);
                break;
        }
    }

    printTree() {
        console.log('tree was printed');
    }

    classify(rowData) {
        return this.classifier.classify(rowData);
    }
}