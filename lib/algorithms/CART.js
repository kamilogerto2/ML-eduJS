const Algorithm = require('../base/algorithm');

module.exports = class CART extends Algorithm {
    constructor(descriptive = false) {
        const binary = true;
        const type = 'CART';
        super(type, binary, descriptive);
    }

    /**
     * split data basing on specific criteria
     * @param data
     * @returns {{bestGain: number, bestFeature: string, bestRule: string, bestDivided: Array}}
     */
    splitData(data) {
        const impurity = this.qualityIndicators.gini(data, this.labels);
        let bestGain = 0;
        let bestFeature = 'none';
        let bestRule = 'none';
        let bestDivided = [];

        // find the best feature and rule
        for(let feature in this.labels) {
            if (this.labels.hasOwnProperty(feature)) {
                const featureIndex = this.labels[feature].order;
                const featureColumn = data.map(dataRow => dataRow[featureIndex]);
                const uniqueRules = new Set(featureColumn);

                uniqueRules.forEach(rule => {
                    const divided = this.divideData(data, feature, rule);
                    const giniInfo = this.qualityIndicators.giniGain([divided.left, divided.right], data, impurity, this.labels);

                    if (giniInfo > bestGain) {
                        bestGain = giniInfo;
                        bestFeature = feature;
                        bestRule = rule;
                        bestDivided = divided;
                    }
                });
            }
        }

        return { bestQualityIndicator: bestGain, bestFeature, bestRule, bestDivided }
    }

    /**
     * divide data into two binary subsets
     * @param data
     * @param feature
     * @param rule
     * @returns {{left: Array, right: Array}}
     */
    divideData(data, feature, rule) {
        const featureIndex = this.labels[feature].order;
        let leftValues = [];
        let rightValues = [];

        data.forEach(dataRow => dataRow[featureIndex] === rule ? leftValues.push(dataRow) : rightValues.push(dataRow));

        return { left: leftValues, right: rightValues};
    }

    describe() {
        console.log(`CART algorithm is one of the most popular of the decission tree learning algorithms.
A CART tree is a binary decision tree that is constructed by splitting a node into two child nodes repeatedly,
beginning with the root node that contains the whole learning sample.
        
How to divide data in node is determined by Gini index and Gini information gain.
Node 'letf' mean that answer for the question is positive and 'right' when answer is not positive.
`);
    }
};
