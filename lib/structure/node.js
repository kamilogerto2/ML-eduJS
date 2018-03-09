const Node = require('./node');
const Leaf = require('./leaf');

module.exports = class Node {
    constructor(data) {
        this.data = data;
        this.question = '';
        this.rule = '';
    }

    addLeaf(predictions, label) {
        this[label] = new Leaf(predictions);
    }

    defineQuestion(question) {
        this.question = question;
    }

    defineRule(rule) {
        this.rule =rule;
    }

    addNode(data, label) {
        this[label] = new Node(data);
    }
}