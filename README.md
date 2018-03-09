# ML-eduJS
ML-eduJS is the simple library for using and understand decission tree and learning algorithm for them.

With library you can:
- implement own decission tree with all of the nodes and leafs
- use predefined algorithm for decission tree learning - CART, ID3
- save tree to json file with readable form
- save tree to json with form which can be reused later

WARNING: Speed and optimization is not the main goal of the library

## Creating basic structure elements (Leaf, Node, Tree)
In this section I will show you simply you can create basic decission tree structure elements and after that - how you can use it.

### Leaf
The smalles object in the decission tree is leaf. Leaf provides you specific classes. To create leaf do as follows:
```
const predictions = [{'Orange': 0.5}, {'Apple': 0.5}];
const leaf = new Leaf(predictions);
```
Not easy? We created new Leaf with corresponding predictions. What does it mean? When our decission tree comes to these leaf - it mean that our set of data shows to Orange with probability 50% and Apple with probability 50%. That's all. Leaf doesn't have special logic - it's not necessary.

### Node
More complicated than Leafs are Nodes. Node is the place where our data should be divided into subsets - two (binary tree) or more. In each of the decission tree Nodes should provides to Leafs at the end. Lets assume that we have some kind of data:
```
const learningData = [
    ['Green', 'Sweet', 'Apple'],
    ['Orange', 'Bitter', 'Grape'],
];
```
In our data two first columns are feature and last column is label - class which is expected to recognize.

IMPORTANT: Label (class) need to be always in the last column.

Now we can create our node which has these specific data:
```
const node = new Node(learningData);
```
Why we need to feed data to the Node? Because in the process of learning node need to be divided in the base of them.

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
Now we have all what is needed to implement full decission tree. It's not comfortable to do it manually but there is another way - learning algorithm or read from JSON file.

To create decission tree we will use elements which we provide earlier:
```
const labels = ['colors', 'taste']
const tree = new Tree(node, labels, 'CART');
```
To create tree we need to provide init node (which can have another nodes etc...), labels which determines features in out training data and type. For now there are only two supported - CART and ID3. To provide new one - you should write own simple  classification algorithm.

Full example how to create Tree you can find in [here](examples/structure.js)