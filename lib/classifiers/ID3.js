const Classifier = require('../base/classifier')

module.exports = class ID3_Classifier extends Classifier{
    constructor(tree, labels) {
        super(tree, labels)
    }

    recursiveClassify(node, rowData) {
        if (node.hasOwnProperty('finalClass')) {
            return node.finalClass;
        } else {
            return this.recursiveClassify(node[rowData[this.labels[node.question].order]], rowData);
        }
    }
};
