const CART_Classifier = require('../classifiers/CART');
const ID3_Classifier = require('../classifiers/ID3');

module.exports = class Tree {
    constructor(initNode, labels, type) {
        this.tree = initNode;
        this.labels = labels;
        this.treeStructure = '';

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
        const cloneTree = Object.assign({}, this.tree);
        this.cleanElement(cloneTree);
        console.log(JSON.stringify(cloneTree, null, 4))
    }

    cleanElement(node) {
        if(node.decisionRef && node.decisionRef.length) {
            node.decisionRef.forEach(ref => {
                this.cleanElement(node[ref]);
            });

            delete node.decisionRef;
            delete node.data;

            if(!node.rule) {
                delete node.rule;
            }
        } else {
            delete node.data;
        }
    }

    classify(rowData) {
        return this.classifier.classify(rowData);
    }
};
