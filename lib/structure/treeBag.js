const BAG_VOTE_Classifier = require('../classifiers/BAG_VOTE');

module.exports = class Tree {
    constructor(trees, labels, type) {
        this.trees = trees;
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
            case 'Bagging':
                this.classifier = new BAG_VOTE_Classifier(this.trees, labels);
                break;
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
