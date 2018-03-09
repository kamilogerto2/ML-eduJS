const Leaf = require('./leaf');

module.exports = class Node {
    constructor(data) {
        this.data = data;
        this.question = '';
        this.rule = '';
        this.decisionRef = [];
    }

    addLeaf(predictions, label) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Leaf(predictions);
    }

    defineQuestion(question) {
        this.question = question;
    }

    defineRule(rule) {
        this.rule =rule;
    }

    addNode(data, label) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Node(data);
    }
};
