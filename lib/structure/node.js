const Leaf = require('./leaf');

module.exports = class Node {
    constructor(data, id = 0, probability = 1) {
        this.data = data;
        this.question = '';
        this.rule = '';
        this.probability = probability;
        this.decisionRef = [];
        this.id = id;
    }

    /**
     * Add single leaf to node
     * @param predictions
     * @param label
     * @param probability
     */
    addLeaf(predictions, label, probability) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Leaf(predictions, probability);
    }

    /**
     * Define node question for example 'color'
     * @param question
     */
    defineQuestion(question) {
        this.question = question;
    }

    /**
     * Define node rule for example for color itt could be 'Green". So - if color is green?
     * @param rule
     */
    defineRule(rule) {
        this.rule = rule;
    }

    /**
     * Add subnode to node
     * @param data
     * @param label
     * @param id
     * @param probability
     */
    addNode(data, label, id, probability) {

        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Node(data, id, probability);
    }
};
