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

    /**
     * init classification algorithm - each of the algorithms could have own
     * @param type
     * @param labels
     */
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

    /**
     * print generated tree - it's cleaned version
     */
    printTree() {
        const cloneTree = JSON.parse(JSON.stringify(this.tree));
        this.cleanElement(cloneTree);
        console.log(JSON.stringify(cloneTree, null, 4))
    }

    /**
     * save full tree without cleaning - it could be used later with algorithms functions
     * @param path
     */
    saveFullTree(path) {
        const tree = JSON.parse(JSON.stringify(this.tree));
        const exportedTree = {
            tree,
            labels: this.labels,
            type: this.type,
        };

        fs.writeFileSync(path, JSON.stringify(exportedTree, null, 4) , 'utf-8');
    }

    /**
     * save pure tree - it could be used for classification but not for editing
     * @param path
     */
    savePureTree(path) {
        const cloneTree = JSON.parse(JSON.stringify(this.tree));
        this.cleanElement(cloneTree);

        fs.writeFileSync(path, JSON.stringify(cloneTree, null, 4) , 'utf-8');
    }

    /**
     * clean tree to put cleaner tree version
     * @param node
     */
    cleanElement(node) {
        if(node.decisionRef && node.decisionRef.length) {
            node.decisionRef.forEach(ref => {
                this.cleanElement(node[ref]);
            });

            delete node.decisionRef;
            delete node.data;
            delete node.probability;

            if(!node.rule) {
                delete node.rule;
            }
        } else {
            delete node.data;
            delete node.probability;
        }
    }

    /**
     * classify specific by user data
     * @param rowData
     * @returns {*}
     */
    classify(rowData) {
        return this.classifier.classify(rowData);
    }
};
