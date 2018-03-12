const CART_Classifier = require('../classifiers/CART');
const ID3_Classifier = require('../classifiers/ID3');
const C45_Classifier = require('../classifiers/C45');
const fs = require('fs');

module.exports = class Tree {
    constructor(initNode, labels, type) {
        this.tree = initNode;
        this.type = type;
        this.labels = labels;
        this.initClassifier(type, labels);
    }

    initClassifier(type, labels) {
        switch(type) {
            case 'CART':
                this.classifier = new CART_Classifier(this.tree, labels);
                break;
            case 'ID3':
                this.classifier = new ID3_Classifier(this.tree, labels);
                break;
            case 'C45':
                this.classifier = new C45_Classifier(this.tree, labels);
                break;
        }
    }

    printTree() {
        const cloneTree = Object.assign({}, this.tree);
        this.cleanElement(cloneTree);
        console.log(JSON.stringify(cloneTree, null, 4))
    }

    saveFullTree(path) {
        const tree = Object.assign({}, this.tree);
        const exportedTree = {
            tree,
            labels: this.labels,
            type: this.type,
        };

        fs.writeFileSync(path, JSON.stringify(exportedTree, null, 4) , 'utf-8');
    }

    savePureTree(path) {
        const cloneTree = Object.assign({}, this.tree);
        this.cleanElement(cloneTree);
        fs.writeFileSync(path, JSON.stringify(cloneTree, null, 4) , 'utf-8');
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
