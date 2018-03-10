const Leaf = require('./leaf');

module.exports = class Node {
    constructor(data, id = 0) {
        this.data = data;
        this.question = '';
        this.rule = '';
        this.decisionRef = [];
        this.id = id;
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

    addNode(data, label, id) {
        if(this.decisionRef.indexOf(label) === -1) {
            this.decisionRef.push(label);
        }

        this[label] = new Node(data, id);
    }
};
