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

    addLeaf(predictions, label, probability) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Leaf(predictions, probability);
    }

    defineQuestion(question) {
        this.question = question;
    }

    defineRule(rule) {
        this.rule =rule;
    }

    addNode(data, label, id, probability) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Node(data, id, probability);
    }
};
