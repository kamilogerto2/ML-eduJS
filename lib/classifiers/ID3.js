module.exports = class ID3_Classifier {
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
            return this.recurciveClassify(node[rowData[this.labels.indexOf(node.question)]], rowData);
        }
    }
};