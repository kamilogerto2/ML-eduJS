module.exports = class CART_Classifier {
    constructor(tree, labels) {
        this.tree = tree;
        this.labels = labels;
    }

    classify(rowData) {
        return this.recurciveClassify(this.tree, rowData)
    }

    recurciveClassify(node, rowData) {
        if (node.hasOwnProperty('finalClass')) {
            return node.finalClass;
        } else {
            if (rowData[this.labels[node.question].order] === node.rule) {
                return this.recurciveClassify(node.left, rowData);
            } else {
                return this.recurciveClassify(node.right, rowData);
            }
        }
    }
};
