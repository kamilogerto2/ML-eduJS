const Algorithm = require('../structure/algorithm');

module.exports = class ID3 extends Algorithm {
    constructor() {
        const binary = false;
        const type = 'ID3';
        super(type, binary);
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
        this.labels.forEach((feature, index) => {
            const featureColumn = data.map(dataRow => dataRow[index]);
            const uniqueRules = new Set(featureColumn);
            const dividedSets = this.divideData(data, feature, uniqueRules);

            for (let set in dividedSets) {
                if (dividedSets.hasOwnProperty(set)) {
                    const entropyInfo = this.qualityIndicators.entropyInfo(entropy, data, dividedSets[set]);

                    if (entropyInfo > bestEntropyInfo) {
                        bestEntropyInfo = entropyInfo;
                        bestFeature = feature;
                        bestDivided = dividedSets;
                    }
                }
            }
        });

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
        const featureIndex = this.labels.indexOf(feature);
        let sets = [];

        uniqueRules.forEach(rule => {
            sets[rule] = data.filter(dataRow => dataRow[featureIndex] === rule);
        });

        return sets;
    }
};
