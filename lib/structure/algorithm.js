const Tree = require('./tree');
const Node = require('./node');
const QualityIndicators = require('../qualityIndicators');


module.exports = class Algorithm {
    /**
     *
     * @param type of algorithm for example CART or ID3
     * @param labels
     * @param binary
     */
    constructor(type, binary) {
        this.type = type;
        this.qualityIndicators = new QualityIndicators();
        this.binary = binary;
    }

    /**
     * build tree based on specific algorithm
     * @param data
     * @returns {*}
     */
    buildTree(data, labels) {
        this.labels = labels;
        let initNode = new Node(data);
        this.buildNodes(initNode);
        let tree = new Tree(initNode, this.labels, this.type);
        return tree;
    }

    /**
     * calculate predictions of specific class
     * @param data
     * @returns {Array}
     */
    calculatePredictions(data) {
        const labelColumn = data.map(dataRow => dataRow[dataRow.length - 1]);
        const uniqueLabels = new Set(labelColumn);
        const totalLength = data.length;
        let predictions = [];

        uniqueLabels.forEach(uniqueLabel => {
            const labelCount = data.filter(dataRow => dataRow[dataRow.length - 1] === uniqueLabel).length;
            let labelPrediction = {};
            labelPrediction[uniqueLabel] = labelCount / totalLength;
            predictions.push(labelPrediction);
        });

        return predictions;
    }

    /**
     * build nodes - if needed change them to leafs
     * @param node - newly created node
     * @param parent - parent node
     * @param label - newly created node label
     */
    buildNodes(node, parent = null, label = null) {
        // split data into parts and calculate quality indicator
        const { bestQualityIndicator, bestFeature, bestRule, bestDivided } = this.splitData(node.data);

        // if quality indicator is equal to 0 than we need to change our node to leaf
        if( bestQualityIndicator === 0 ) {
            // calculate predictions for leaf data
            const predictions = this.calculatePredictions(node.data);
            // add leaf in the place of node
            parent.addLeaf(predictions, label);
        } else {
            node.defineQuestion(bestFeature);
            node.defineRule(bestRule || '');

            for(let dividedLabel in bestDivided) {
                if(bestDivided.hasOwnProperty(dividedLabel)) {
                    node.addNode(bestDivided[dividedLabel], dividedLabel);
                    this.buildNodes(node[dividedLabel], node, dividedLabel);
                }
            }
        }
    }
};