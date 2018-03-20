const Classifier = require('../base/classifier')

module.exports = class C45_Classifier extends Classifier{
    constructor(tree, labels) {
        super(tree, labels)
    }

    recursiveClassify(node, rowData) {
        if(!node) {
            return [{'unknown': 1}]
        }

        if (node.hasOwnProperty('finalClass')) {
            return node.finalClass;
        } else {
            if(rowData[this.labels[node.question].order] === '?' || !node[rowData[this.labels[node.question].order]]) {
                let bestProbability = 0;
                let bestNodeRef = null;

                node.decisionRef.forEach(nodeRef => {
                    if(node[nodeRef].probability > bestProbability) {
                        bestProbability = node[nodeRef].probability;
                        bestNodeRef = nodeRef;
                    }
                });
                return this.recursiveClassify(node[bestNodeRef], rowData);
            }

            if(this.labels[node.question].type === 'numeric') {
                const threshold = node.decisionRef[0].replace('<=','').replace('>', '');
                let childNodeKey;
                if(parseFloat(rowData[this.labels[node.question].order]) <= parseFloat(threshold)) {
                    childNodeKey = `<=${threshold}`;
                } else {
                    childNodeKey = `>${threshold}`;
                }

                return this.recursiveClassify(node[childNodeKey], rowData);
            } else {
                return this.recursiveClassify(node[rowData[this.labels[node.question].order]], rowData);
            }
        }
    }
};