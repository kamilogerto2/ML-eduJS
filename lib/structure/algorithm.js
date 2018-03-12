const Tree = require('./tree');
const Node = require('./node');
const QualityIndicators = require('../qualityIndicators');


module.exports = class Algorithm {
    /**
     *
     * @param type of algorithm for example CART or ID3
     * @param type
     * @param binary
     * @param descriptive
     */
    constructor(type, binary, descriptive = false) {
        this.type = type;
        this.qualityIndicators = new QualityIndicators();
        this.binary = binary;
        this.descriptive = descriptive;
        this.nodeCounter = 0;
    }

    /**
     * build tree based on specific algorithm
     * @param data
     * @returns {*}
     */
    buildTree(data, labels) {
        this.nodeCounter = 0;

        if(this.descriptive) {
            this.describe();
        }

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
    buildNodes(node, parent = null, label = 'main', depth = 0) {

        if(this.descriptive) {
            console.log('');
            console.log(`Node ${label}, depth ${depth}, nodeID ${node.id}, parentID ${parent ? parent.id : null}`)
        }

        // split data into parts and calculate quality indicator
        const { bestQualityIndicator, bestFeature, bestRule, bestDivided } = this.splitData(node.data);

        // if quality indicator is equal to 0 than we need to change our node to leaf
        if( bestQualityIndicator === 0 ) {
            // calculate predictions for leaf data
            const predictions = this.calculatePredictions(node.data);

            if (this.descriptive) {
                const predictionString = predictions.reduce((acc, prediction) => `${acc}, ${Object.keys(prediction)[0]}: ${prediction[Object.keys(prediction)[0]]}`, '')
                console.log(`Quality indicator is equal to 0 so cannot split the data. Leaf is created with predictions ${predictionString}`);
            }

            // add leaf in the place of node
            parent.addLeaf(predictions, label, node.probability);
        } else {
            if (this.descriptive) {
                if(bestRule) {
                    console.log(`The best split is for feature ${bestFeature} and rule ${bestRule} because quality indicator is equal to ${bestQualityIndicator}`);
                    console.log(`So the question for split is: Is ${bestFeature} is ${bestRule}?`)
                } else {
                    console.log(`The best split is for feature ${bestFeature} because quality indicator is equal to ${bestQualityIndicator}`);
                }
            }
            node.defineQuestion(bestFeature);
            node.defineRule(bestRule || '');

            if (this.descriptive) {
                for(let dividedLabel in bestDivided) {
                    if(bestDivided.hasOwnProperty(dividedLabel)) {
                        console.log(`Create node ${dividedLabel}`);
                    }
                }
            }

            for(let dividedLabel in bestDivided) {
                if(bestDivided.hasOwnProperty(dividedLabel)) {
                    this.nodeCounter++;
                    node.addNode(bestDivided[dividedLabel], dividedLabel, this.nodeCounter, bestDivided[dividedLabel].length/node.data.length);
                    this.buildNodes(node[dividedLabel], node, dividedLabel, depth + 1);
                }
            }
        }
    }

    describe() {
        console.log('algorithm definition');
    }
};