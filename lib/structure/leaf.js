module.exports = class Leaf {
    constructor(predictions, probability) {
        this.finalClass = predictions;
        this.probability = probability;
    }
}