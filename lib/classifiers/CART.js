const Classifier = require('../base/classifier')

module.exports = class CART_Classifier extends Classifier{
    constructor(tree, labels) {
        super(tree, labels);
    }

    recursiveClassify(node, rowData) {
        if (node.hasOwnProperty('finalClass')) {
            return node.finalClass;
        } else {
            if (rowData[this.labels[node.question].order] === node.rule) {
                return this.recursiveClassify(node.left, rowData);
            } else {
                return this.recursiveClassify(node.right, rowData);
            }
        }
    }
};
