module.exports = class QualityIndicators {
    constructor() {

    }

    gini(dataSet) {
        const labelColumn = dataSet.map(dataRow => dataRow[dataSet[0].length - 1]);
        const uniqueLabels = new Set(labelColumn);
        let impurity = 1;

        uniqueLabels.forEach((uniqueLabel) => {
            const labelsCount = labelColumn.filter(label => label === uniqueLabel).length;
            impurity -= Math.pow(labelsCount / dataSet.length, 2);
        });

        return impurity;
    }

    giniGain(sets, data, impurity, labels) {
        return impurity - sets.reduce((acc, set) => acc + (set.length/data.length) * this.gini(set, labels), 0)
    }

    entropy(dataSet) {
        const labelColumn = dataSet.map(dataRow => dataRow[dataSet[0].length - 1]);
        const uniqueLabels = new Set(labelColumn);
        let entropy = 0;

        uniqueLabels.forEach((uniqueLabel) => {
            const labelsCount = labelColumn.filter(label => label === uniqueLabel).length;
            const probabilty = labelsCount/dataSet.length;

            entropy -= probabilty * Math.log2(probabilty) * probabilty;
        });

        return entropy;
    }

    entropyInfo(totalEntropy, dataSet, dividedSets) {
        let entropyInfo = totalEntropy;

        for (let set in dividedSets) {
            if(dividedSets.hasOwnProperty(set)) {
                entropyInfo -= (dividedSets[set].length / dataSet.length) * this.entropy(dividedSets[set]);
            }
        }

        return entropyInfo;
    }
};
