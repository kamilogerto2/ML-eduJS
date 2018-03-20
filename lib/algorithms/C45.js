const Algorithm = require('../base/algorithm');

module.exports = class C45 extends Algorithm {
    constructor(options) {
        const binary = false;
        const type = 'C45';
        super(type, binary, options);

        this.pruneCounter = 0;
        this.actualPrune = 0;
    }

    /**
     * split data basing on specific criteria
     * @param data
     * @returns {{bestQualityIndicator: number, bestFeature: string, bestRule: string, bestDivided: Array}}
     */
    splitData(data) {
        const entropy = this.qualityIndicators.entropy(data);
        let bestEntropyInfo = 0;
        let bestFeature = 'none';
        let bestRule = '';
        let bestDivided = [];

        // find the best feature
        for(let feature in this.labels) {
            if (this.labels.hasOwnProperty(feature)) {
                const featureIndex = this.labels[feature].order;
                const filteredData = data.filter(dataRow => dataRow[featureIndex] !== '?' && dataRow[featureIndex] !== ' ?');
                const featureColumn = filteredData.map(dataRow => dataRow[featureIndex]);
                let dividedSets = [];

                switch (this.labels[feature].type) {
                    case 'numeric':
                        dividedSets = this.divideContinouesData(filteredData, featureIndex, featureColumn, entropy);
                        break;
                    default:
                        const uniqueRules = new Set(featureColumn);
                        dividedSets = this.divideData(filteredData, feature, uniqueRules);
                        break;
                }

                const entropyInfo = this.qualityIndicators.gainRatio(entropy, filteredData, dividedSets);

                if (entropyInfo > bestEntropyInfo) {
                    bestEntropyInfo = entropyInfo;
                    bestFeature = feature;
                    bestDivided = dividedSets;
                }
            }
        }


        return { bestQualityIndicator: bestEntropyInfo, bestFeature, bestRule, bestDivided }
    }

    /**
     * divide data into two binary subsets
     * @param data
     * @param feature
     * @param rule
     * @returns {}
     */
    divideData(data, feature, uniqueRules) {
        const featureIndex = this.labels[feature].order;
        let sets = [], iterator;

        uniqueRules.forEach(rule => {
            sets[rule] = [];
        });

        for(iterator = 0; iterator < data.length; iterator++) {
            sets[data[iterator][featureIndex]].push(data[iterator]);
        }

        return sets;
    }

    /**
     * divide continues data into two subsets
     * @param data
     * @param featureIndex
     * @param featureColumn
     * @param entropy
     * @returns {*}
     */
    divideContinouesData(data, featureIndex, featureColumn, entropy) {
        let bestEntropyInfo = 0;
        let sets = null;
        let leftSide, rightSide, leftKey, rightKey, tempSets, entropyInfo, iterator;

        featureColumn = new Set(featureColumn.sort((a, b) => a - b));
        featureColumn.forEach(compareValue => {
            leftSide = [];
            rightSide = [];

            for(iterator = 0; iterator < data.length; iterator++) {
                if(parseFloat(data[iterator][featureIndex]) <= parseFloat(compareValue)) {
                    leftSide.push(data[iterator]);
                } else {
                    rightSide.push(data[iterator]);
                }
            }
            leftKey = `<=${compareValue}`;
            rightKey = `>${compareValue}`;
            tempSets = {[leftKey]: leftSide, [rightKey]: rightSide };

            entropyInfo = this.qualityIndicators.entropyInfo(entropy, data, tempSets);

            if(entropyInfo > bestEntropyInfo || bestEntropyInfo === 0) {
                bestEntropyInfo = entropyInfo;
                sets = tempSets;
            }
        });

        return sets;
    }

    /**
     * prune tree - cut branches which can provide to overfitting
     */
    pruneTree() {
        this.pruneCounter++;
        const pruneNumber = this.pruneCounter;
        this.pruneNode(this.tree.tree, null, pruneNumber);
    }

    /**
     * Recursive algorithm to pruning node
     * @param node
     * @param parent
     * @param pruneNumber
     */
    pruneNode(node, parent, pruneNumber) {
        if(pruneNumber > this.actualPrune) {
            if (node.hasOwnProperty('finalClass') && parent) {
                let errors = [];
                const parentError = this.calculateStaticError(parent);
                let backedupError = 0;
                parent.decisionRef.forEach(ref => {
                    const error = parent[ref].hasOwnProperty('finalClass') ? this.calculateStaticError(parent[ref], true, parent) : this.calculateStaticError(parent[ref]);
                    backedupError += error.value * parent[ref].probability;
                    errors.push(error)
                });

                if (backedupError - parentError.value > this.options.errorPruneThreshold) {
                    Object.keys(parent).forEach(function(key) { key !== 'probability' ? delete parent[key] : null; });
                    parent.finalClass = [{[parentError.bestClass]: 1}];
                    this.actualPrune++;
                    this.pruneTree();
                }
            } else {
                if(node.decisionRef) {
                    node.decisionRef.forEach(ref => this.pruneNode(node[ref], node, pruneNumber))
                }
            }
        }
    }

    /**
     * Calculate static error
     * @param node
     * @param isLeaf
     * @param parent
     * @returns {{value: number, bestClass: *}}
     */
    calculateStaticError(node, isLeaf, parent) {
        let bestClass = null;
        let bestProbability = 0;
        let N = 0;
        let n = 0;

        if(isLeaf) {
            N = parent.data.length * node.probability;

            node.finalClass.forEach(oneClass => {
                for(let label in oneClass) {
                    if(oneClass.hasOwnProperty(label) && oneClass[label] > bestProbability) {
                        bestProbability = oneClass[label];
                        bestClass = label;
                    }
                }
            });

            n = bestProbability * N;
        } else {
            N = node.data.length;
            this.classes.forEach(oneClass => {
                const classCount = node.data.filter(row => row[row.length - 1] === oneClass).length;
                if(classCount > bestProbability) {
                    bestClass = oneClass;
                    bestProbability = classCount;
                }
            });

            n = bestProbability;
        }

        return {
            value:(N - n + this.classCount - 1)/(N + this.classCount),
            bestClass
        };
    }

    describe() {
        console.log('C4.5 builds decision trees from a set of training data in the same way as ID3, using the concept of information entropy. The training data is a set S={s_{1},s_{2},...} of already classified samples. Each sample s_{i} consists of a p-dimensional vector (x_{{1,i}},x_{{2,i}},...,x_{{p,i}}), where the x_{j} represent attribute values or features of the sample, as well as the class in which s_{i} falls.\n' +
            '\n' +
            'At each node of the tree, C4.5 chooses the attribute of the data that most effectively splits its set of samples into subsets enriched in one class or the other. The splitting criterion is the normalized information gain (difference in entropy). The attribute with the highest normalized information gain is chosen to make the decision. The C4.5 algorithm then recurs on the smaller sublists.');
    }
};
