const Algorithm = require('../structure/algorithm');

module.exports = class C45 extends Algorithm {
    constructor(descripitve = false) {
        const binary = false;
        const type = 'C45';
        super(type, binary, descripitve);
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
        let featureIndex = 0;

        // find the best feature
        for(let feature in this.labels) {
            if (this.labels.hasOwnProperty(feature)) {
                featureIndex = this.labels[feature].order;
                const featureColumn = data.map(dataRow => dataRow[featureIndex]);
                let dividedSets = [];

                switch (this.labels[feature].type) {
                    case 'numeric':
                        dividedSets = this.divideContinouesData(data, featureIndex, featureColumn, entropy)
                        break;
                    default:
                        const uniqueRules = new Set(featureColumn);
                        dividedSets = this.divideData(data, feature, uniqueRules);
                        break;
                }

                const entropyInfo = this.qualityIndicators.gainRatio(entropy, data, dividedSets);

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

    divideContinouesData(data, featureIndex, featureColumn, entropy) {
        let bestEntropyInfo = 0;
        let sets = null;

        featureColumn.sort((a, b) => a - b);
        featureColumn.forEach(compareValue => {
            const leftSide = data.filter(value => value[featureIndex] <= compareValue);
            const rightSide = data.filter(value => value[featureIndex] > compareValue);
            const leftKey = `<=${compareValue}`;
            const rightKey = `>${compareValue}`;
            const tempSets = {[leftKey]: leftSide, [rightKey]: rightSide };

            const entropyInfo = this.qualityIndicators.entropyInfo(entropy, data, tempSets);

            if(entropyInfo > bestEntropyInfo || bestEntropyInfo === 0) {
                bestEntropyInfo = entropyInfo;
                sets = tempSets;
            }
        });

        return sets;
    }

    describe() {
        console.log();
    }
};
