const Algorithm = require('../structure/algorithm');

module.exports = class ID3 extends Algorithm {
    constructor(descripitve = false) {
        const binary = false;
        const type = 'ID3';
        super(type, binary, descripitve);
    }

    /**
     * split data basing on specific criteria
     * @param data
     * @returns {{bestGain: number, bestFeature: string, bestRule: string, bestDivided: Array}}
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
                const featureColumn = data.map(dataRow => dataRow[featureIndex]);

                const uniqueRules = new Set(featureColumn);
                const dividedSets = this.divideData(data, feature, uniqueRules);

                const entropyInfo = this.qualityIndicators.entropyInfo(entropy, data, dividedSets);

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
     * @returns {{left: Array, right: Array}}
     */
    divideData(data, feature, uniqueRules) {
        const featureIndex = this.labels[feature].order;
        let sets = [];

        uniqueRules.forEach(rule => {
            sets[rule] = data.filter(dataRow => dataRow[featureIndex] === rule);
        });

        return sets;
    }

    describe() {
        console.log(`The ID3 algorithm begins with the original set S as the root node. On each iteration of the algorithm, it iterates through every unused attribute of the set S and calculates the entropy H(S) (or information gain IG(S) of that attribute. It then selects the attribute which has the smallest entropy (or largest information gain) value.`);
    }
};
