module.exports = class C45_Classifier {
    constructor(tree, labels) {
        this.tree = tree;
        this.labels = labels;
    }

    classify(rowData) {
        return this.recursiveClassify(this.tree, rowData)
    }

    recursiveClassify(node, rowData) {
        if (node.hasOwnProperty('finalClass')) {
            return node.finalClass;
        } else {
            return this.recursiveClassify(node[rowData[this.labels[node.question].order]], rowData);
        }
    }
};