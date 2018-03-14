const csv = require('fast-csv');
const fs = require('fs');
const C45 = require('../../lib/algorithms/C45');

const trainingStream = fs.createReadStream('iris-training.csv');
const testStream = fs.createReadStream('iris-test.csv');

const labels = {
    sepalLength : {
        type: 'numeric',
        order: '0'
    },
    sepalWidth : {
        type: 'numeric',
        order: '1'
    },
    petalLength : {
        type: 'numeric',
        order: '2'
    },
    petalWidth : {
        type: 'numeric',
        order: '3'
    }
};

let trainingSet = [];
let tree = [];

const csvLearningStream = csv()
    .on("data", function(data){
        data.length ? trainingSet.push(data) :  null;
    })
    .on("end", function(){
        // init and run algorithm, turn on descriptive mode and with prunning
        const options = {
            descriptive: false,
            prune: true
        };
        const cartAlgorithm = new C45(options);
        tree = cartAlgorithm.buildTree(trainingSet, labels);

        // print tree in console
        tree.printTree();
        testTree();
    });

const csvTestStream = csv()
    .on("data", function(data){
        console.log(data);
        if(data.length) {
            console.log(tree.classify(data));
        }
    });

function testTree() {
    testStream.pipe(csvTestStream);
}

trainingStream.pipe(csvLearningStream);
