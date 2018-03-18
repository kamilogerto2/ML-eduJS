# ML-eduJS
ML-eduJS is the simple library for using and understand Machine Learning Algorithms - for now decission tree and learning algorithm for them. I would like to invite you to read the code and understand what's happening under the hood. It works only on server side but maybe in future I will create browser side version.

With library you can:
- implement own decision tree with all of the nodes and leafs
- use predefined algorithm for decision tree learning - CART, ID3, C4.5
- save tree to json file with readable form
- save tree to json with form which can be reused later
- **descriptive mode**

WARNING: Speed and optimization is not the main goal of the library

## 0. Import package

To install package using npm:

```
npm install ml_edu_js --save
```

After that I recommend to assign some properties:

```
const MLeduJS = require('ml_edu_js');
const CART = MLeduJS.CART; // the same for other submodules which are used in code
```
## 1. [Decision tree - basic structure](https://github.com/kamilogerto2/ML-eduJS/wiki/Decision-Tree---basic-structure)

## 2. Decission tree learning algorithms
As I mentioned - there are three algorithms implemented - CART, ID3, C4.5.

### CART and ID3
Use CART or ID3 in decision tree learning process with library is very simple. You need to define learning data, features array, pass it to algorithm, build tree and... That's all! After that, you can use tree and classify test data. CART and ID3 support only discrete data.

```
const MLeduJS = require('ml_edu_js');
const CART = MLeduJS.CART;

// define learning data
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
    ['Orange', 'Sweet', 'Orange'],
    ['Purple', 'Bitter', 'Plum'],
];

//define feature labels
const labels = ['color', 'taste'];

// init and run algorithm
const cartAlgorithm = new CART();
const tree = cartAlgorithm.buildTree(learningData, labels);

// check it ;)
const prediction = tree.classify(['Purple', 'Bitter', 'Plum']);
console.log(prediction);
```

```
const MLeduJS = require('ml_edu_js');
const ID3 = MLeduJS.ID3;

// define learning data
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
    ['Orange', 'Sweet', 'Orange'],
    ['Purple', 'Bitter', 'Plum'],
];

//define feature labels
const labels = ['color', 'taste'];

// init and run algorithm
const id3Algorithm = new ID3();
const tree = id3Algorithm.buildTree(learningData, labels);

// check it ;)
const prediction = tree.classify(['Purple', 'Bitter', 'Plum']);
console.log(prediction);
```
Full example of CART algorithm you can find [here](examples/cart.js) and ID3 [here](examples/id3.js)

To turn on descriptive mode - you need to pass options object algorithm constructor. With descriptive mode you can observe results of learning algorithm in the console. It will work effectively for small trees. 

```
const options = {
    descriptive: true,
}
const cartAlgorithm = new ID3(options);
```

### C4.5
C4.5 algorithm is the extension of the ID3. It additionally provides possibilities to add continues data, missing value. It also change a little splitting rule and add possibility to prune tree.
Usage of C4.5 is similar to other algorithms but there are two main differences: labels definitions and options. To use C4.5 do as follows:
 
```
const MLeduJS = require('ml_edu_js');
const C45 = MLeduJS.C45;

const learningData = [
    ['Green', 8, 'Apple'],
    ['Orange', 1 , 'Grape'],
    ['Orange', 6, 'Orange'],
    ['Purple', 7, 'Plum'],
    ['Red', 5, 'Orange'],
    ['Red', 7, 'Orange'],
    ['Red', 9, 'Apple'],
];

//define feature labels
const labels = {
    color: {
        type: 'string',
        order: 0
    },
    taste: {
        type: 'numeric',
        order: 1
    }
};

// init and run algorithm, turn on descriptive mode and with prunning
const options = {
    descriptive: true,
    prune: true
};
const cartAlgorithm = new C45(options);
const tree = cartAlgorithm.buildTree(learningData, labels);

tree.printTree();

// check it ;)
const prediction = tree.classify(['?', '?', 'Orange']);
console.log(`\n Prediction for our test sample:`);
console.log(prediction);
```
