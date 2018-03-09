const Algorithm = require('../structure/algorithm');

module.exports = class CART extends Algorithm {
    constructor() {
        const binary = true;
        const type = 'CART';
        super(type, binary);
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
        this.labels.forEach((feature, index) => {
            const featureColumn = data.map(dataRow => dataRow[index]);
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
        });

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
        const featureIndex = this.labels.indexOf(feature);
        let leftValues = [];
        let rightValues = [];

        data.forEach(dataRow => dataRow[featureIndex] === rule ? leftValues.push(dataRow) : rightValues.push(dataRow));

        return { left: leftValues, right: rightValues};
    }
};
