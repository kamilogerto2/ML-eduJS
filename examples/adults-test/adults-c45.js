const csv = require('fast-csv');
const fs = require('fs');
const C45 = require('../../lib/algorithms/C45');

const trainingStream = fs.createReadStream('adult-training.csv');
const testStream = fs.createReadStream('adult-test.csv');

/**
 * age: continuous.
 workclass: Private, Self-emp-not-inc, Self-emp-inc, Federal-gov, Local-gov, State-gov, Without-pay, Never-worked.
 fnlwgt: continuous.
 education: Bachelors, Some-college, 11th, HS-grad, Prof-school, Assoc-acdm, Assoc-voc, 9th, 7th-8th, 12th, Masters, 1st-4th, 10th, Doctorate, 5th-6th, Preschool.
 education-num: continuous.
 marital-status: Married-civ-spouse, Divorced, Never-married, Separated, Widowed, Married-spouse-absent, Married-AF-spouse.
 occupation: Tech-support, Craft-repair, Other-service, Sales, Exec-managerial, Prof-specialty, Handlers-cleaners, Machine-op-inspct, Adm-clerical, Farming-fishing, Transport-moving, Priv-house-serv, Protective-serv, Armed-Forces.
 relationship: Wife, Own-child, Husband, Not-in-family, Other-relative, Unmarried.
 race: White, Asian-Pac-Islander, Amer-Indian-Eskimo, Other, Black.
 sex: Female, Male.
 capital-gain: continuous.
 capital-loss: continuous.
 hours-per-week: continuous.
 native-country: United-States, Cambodia, England, Puerto-Rico, Canada, Germany, Outlying-US(Guam-USVI-etc), India, Japan, Greece, South, China, Cuba, Iran, Honduras, Philippines, Italy, Poland, Jamaica, Vietnam, Mexico, Portugal, Ireland, France, Dominican-Republic, Laos, Ecuador, Taiwan, Haiti, Columbia, Hungary, Guatemala, Nicaragua, Scotland, Thailand, Yugoslavia, El-Salvador, Trinadad&Tobago, Peru, Hong, Holand-Netherlands.
 * @type {{sepalLength: {type: string, order: string}, sepalWidth: {type: string, order: string}, petalLength: {type: string, order: string}, petalWidth: {type: string, order: string}}}
 */

const labels = {
    age : {
        type: 'numeric',
        order: '0'
    },
    workclass : {
        type: 'string',
        order: '1'
    },
    fnlwgt : {
        type: 'numeric',
        order: '2'
    },
    education : {
        type: 'string',
        order: '3'
    },
    educationNum : {
        type: 'numeric',
        order: '4'
    },
    martialStatus : {
        type: 'string',
        order: '5'
    },
    occupation : {
        type: 'string',
        order: '6'
    },
    relationship : {
        type: 'string',
        order: '7'
    },
    race : {
        type: 'string',
        order: '8'
    },
    sex : {
        type: 'string',
        order: '9'
    },
    capitalGain : {
        type: 'numeric',
        order: '10'
    },
    capitalLoss : {
        type: 'numeric',
        order: '11'
    },
    hoursPeerWeek : {
        type: 'numeric',
        order: '12'
    },
    nativeCountry : {
        type: 'string',
        order: '13'
    },
};

let trainingSet = [];
let tree = [];

const csvLearningStream = csv()
    .on("data", data => {
        data.length ? trainingSet.push(data) :  null;
    })
    .on("end", () => {
        // init and run algorithm, turn on descriptive mode and with prunning
        const options = {
            descriptive: false,
            prune: true,
            errorPruneThreshold: 0.005
        };
        const cartAlgorithm = new C45(options);
        tree = cartAlgorithm.buildTree(trainingSet, labels);
        testTree();
    });

let totalCount = 0;
let errorCount = 0;
let predictions;
const csvTestStream = csv()
    .on("data", data => {
        if(data.length) {
            totalCount++;
            predictions = tree.classify(data);
            if(!predictions[0].hasOwnProperty(data[data.length - 1])) {
                errorCount++;
            }
        }
    })
    .on("end", () => {
        console.log(`Total count: ${totalCount}`);
        console.log(`Error count: ${errorCount}`);
    });

function testTree() {
    testStream.pipe(csvTestStream);
}

trainingStream.pipe(csvLearningStream);
