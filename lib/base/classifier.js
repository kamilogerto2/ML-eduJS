module.exports = class Classifier {
    constructor(tree, labels) {
        this.tree = tree;
        this.labels = labels;
    }

    classify(rowData) {
        rowData = this.trimData(rowData);

        return this.recursiveClassify(this.tree, rowData)
    }

    trimData(rowData) {
        for(let i = 0; i < rowData.length; i++) {
            if(typeof rowData[i] === 'string') {
                rowData[i] = rowData[i].trim();
            }
        }

        return rowData;
    }

    recursiveClassify() {
        return true;
    }
};
