const CART = require('./lib/algorithms/CART');
const ID3 = require('./lib/algorithms/ID3');
const Algorithm = require('./lib/structure/algorithm');
const Leaf = require('./lib/structure/leaf');
const Node = require('./lib/structure/node');
const Tree = require('./lib/structure/tree');
const Indicators = require('./lib/qualityIndicators');
const TreeLoader = require('./lib/utils/treeLoader');

module.exports = {
    CART,
    ID3,
    TreeLoader,
    Algorithm,
    Leaf,
    Node,
    Tree,
    Indicators,
};