const Tree = require('./tree');
const Node = require('./node');
const QualityIndicators = require('../qualityIndicators');


module.exports = class Algorithm {
    /**
     *
     * @param type of algorithm for example CART or ID3
     * @param type
     * @param binary
     * @param options
     */
    constructor(type, binary, options) {
        const defaultOptions = {
            descriptive: false,
            prune: false,
            errorPruneThreshold: 0.0001
        };

        this.type = type;
        this.qualityIndicators = new QualityIndicators();
        this.binary = binary;
        this.nodeCounter = 0;
        this.classCount = 0;
        this.classes = [];
        this.options = Object.assign({}, defaultOptions, options);
    }

    /**
     * build tree based on specific algorithm
     * @param data
     * @returns {*}
     */
    buildTree(data, labels) {
        console.time("treeBuiltAfter");
        this.nodeCounter = 0;
        this.classes = new Set(data.map(row => row[row.length - 1]));
        this.classCount = this.classes.size;

        if(this.options.descriptive) {
            this.describe();
            console.log('');
            console.log(`Analyzed set has ${this.classCount} classes`);
        }

        this.labels = labels;
        let initNode = new Node(data);
        this.buildNodes(initNode);
        this.tree = new Tree(initNode, this.labels, this.type);

        if(this.options.prune) {
            this.pruneTree();
        }

        console.timeEnd("treeBuiltAfter");
        return this.tree;
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

        if(this.options.descriptive) {
            console.log('');
            console.log(`Node ${label}, depth ${depth}, nodeID ${node.id}, parentID ${parent ? parent.id : null}`)
        }

        // split data into parts and calculate quality indicator
        const { bestQualityIndicator, bestFeature, bestRule, bestDivided } = this.splitData(node.data);

        // if quality indicator is equal to 0 than we need to change our node to leaf
        if( bestQualityIndicator === 0 ) {
            // calculate predictions for leaf data
            const predictions = this.calculatePredictions(node.data);

            if (this.options.descriptive) {
                const predictionString = predictions.reduce((acc, prediction) => `${acc}, ${Object.keys(prediction)[0]}: ${prediction[Object.keys(prediction)[0]]}`, '')
                console.log(`Quality indicator is equal to 0 so cannot split the data. Leaf is created with predictions ${predictionString}`);
            }

            // add leaf in the place of node
            parent.addLeaf(predictions, label, node.probability);
        } else {
            if (this.options.descriptive) {
                if(bestRule) {
                    console.log(`The best split is for feature ${bestFeature} and rule ${bestRule} because quality indicator is equal to ${bestQualityIndicator}`);
                    console.log(`So the question for split is: Is ${bestFeature} is ${bestRule}?`)
                } else {
                    console.log(`The best split is for feature ${bestFeature} because quality indicator is equal to ${bestQualityIndicator}`);
                }
            }
            node.defineQuestion(bestFeature);
            node.defineRule(bestRule || '');

            if (this.options.descriptive) {
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

    /**
     * Describe algorithm for example ID3 or C45 implemented by specific algorithm
     */
    describe() {
        console.log('algorithm definition');
    }

    /**
     * Pruning tree algorithm implemented by specific algorithm
     * @returns {boolean}
     */
    pruneTree() {
        return true;
    }

    /**
     * Splitting data algorithm implemented by specific algorithm
     * @returns {boolean}
     */
    splitData() {
        return true;
    }
};