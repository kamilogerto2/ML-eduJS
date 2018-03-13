const fs = require('fs');
const Tree = require('../structure/tree');

module.exports = class TreeLoader {
    constructor() {

    }

    /**
     * load tree from JSON form specific path
     * @param path
     * @returns {*}
     */
    loadTree(path) {
        const data = fs.readFileSync(path, 'utf8');
        const obj = JSON.parse(data);

        return new Tree(obj.tree, obj.labels, obj.type);
    }
}