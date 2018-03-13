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

## 1. Creating basic structure elements (Leaf, Node, Tree)
In this section I will show how simply you can create basic decision tree structure elements and after that - how you can use it.

### Leaf
The smallest object in decision tree is leaf. Leaf provides you specific classes. To create leaf do as follows:
```
const predictions = [{'Orange': 0.5}, {'Apple': 0.5}];
const leaf = new Leaf(predictions);
```
Not easy? We created new Leaf with corresponding predictions. What does it mean? When our decision tree comes to these leaf - it mean that our set of data shows to Orange with probability 50% and Apple with probability 50%. That's all. Leaf doesn't have special logic - it's not necessary.

### Node
More complicated than Leafs are Nodes. Node is the place where our data should be divided into subsets - two (binary tree) or more. In each of the decision tree Nodes should provides to Leafs at the end. Lets assume that we have some kind of data:
```
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grappe'],
];
```
In our data, two first columns are features and last column - label (class which is expected to recognize).

**IMPORTANT: Label (class) need to be always in the last column.**

Now we can create our node which has specific data:
```
const node = new Node(learningData);
```
Why we need to feed data into the Node? Because in the process of learning node need to be divided in the base of them.

Now we can create simple Leafs in our Node. To do this we need to:
```
const label = 'Orange';
const predictions = [{'Grappe': 1}];
node.addLeaf(predictions, label);
```
To add new leaf to Node we need to provide predictions (look for the Leaf creation) and label. Label is some kind of criteria for node. Lets assume that we want to divide our set with feature 'color'. So, we have to leafs with labels 'Orange' and 'Green';

To add information which feature we choose to divide we can do it as follows:
```
node.defineQuestion('color');
```

### Tree
Now we have all information that's needed to implement full decision tree. It's not comfortable to do it manually but there is another way - learning algorithm or read them from JSON file.

To create decision tree we will use elements which we provide earlier:
```
const labels = ['color', 'taste']
const tree = new Tree(node, labels, 'CART');
```
To create tree we need to provide init node (which can have another nodes etc...), labels which determines features in out training data and type. There are three supported types - CART, ID3 and C4.5. To provide new one - you should write own simple classification algorithm.

Full example how to create Tree you can find [here](examples/structure.js)

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
