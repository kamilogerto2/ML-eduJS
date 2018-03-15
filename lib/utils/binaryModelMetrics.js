module.exports = class BinaryModelMetrics {
    constructor() {
        this.TP = 0;
        this.TN = 0;
        this.FP = 0;
        this.FN = 0;
        this.population = 0;
    }

    initData(tp, tn, fp, fn) {
        this.TP = tp;
        this.TN = tn;
        this.FP = fp;
        this.FN = fn;
        this.population = this.TP + this.TN + this.FP + this.FN;
    }

    accuracy() {
        return (this.TP + this.TN) / this.population;
    }

    recall() {
        return this.TP/(this.TP + this.FN);
    }

    missRate() {
        return this.FN/(this.TP + this.FN);
    }

    fallOut() {
        return this.FP/(this.FP + this.TN);
    }

    specificity() {
        return this.TN/(this.FP + this.TN);
    }

    prevalence() {
        return (this.TP + this.FN)/this.population;
    }

    precision() {
        return this.TP/(this.TP + this.FP);
    }

    falseDiscoveryRate() {
        return this.FP/(this.TP + this.FP);
    }

    falseOmissionRate() {
        return this.FN/(this.TN + this.FN);
    }

    negativePredictiveValue() {
        return this.TN/(this.TN + this.FN);
    }

    positiveLikelihoodRatio() {
        return this.recall()/this.specificity();
    }

    negativeLikelihoodRatio() {
        return this.missRate()/this.specificity();
    }

    diagnosticOddsRatio() {
        return this.positiveLikelihoodRatio()/this.negativeLikelihoodRatio();
    }

    f1Score() {
        return 2/(1/this.recall() + 1/this.precision());
    }

};
