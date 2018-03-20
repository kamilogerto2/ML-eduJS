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

## 1. Decision tree
With ML-eduJS you can build, test and use your own decision trees. Library implements basic structure, but also offers learning algorithms and ensemble algorithms.

Available learning algorithms:
-CART
-ID3
-C4.5

Available ensemble algorithms:
-bagging

- [Decision tree - basic structure](https://github.com/kamilogerto2/ML-eduJS/wiki/Decision-Tree---basic-structure)
- [Decision tree - learning algorithms](https://github.com/kamilogerto2/ML-eduJS/wiki/Decision-Tree---learning-algorithms)

