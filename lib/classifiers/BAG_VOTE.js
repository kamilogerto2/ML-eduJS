module.exports = class BAG_VOTE_Classifier {
    constructor(trees, labels) {
        this.trees = trees;
        this.labels = labels;
    }

    classify(rowData) {
        let votes = {};
        let prediction, vote;

        for(let treeIndex = 0; treeIndex < this.trees.length; treeIndex++) {
            prediction = this.trees[treeIndex].classify(rowData);
            vote = this.getVoteFromPrediction(prediction);

            if(votes.hasOwnProperty(vote)) {
                votes[vote]++;
            } else {
                votes[vote] = 0;
            }
        }

        return this.getBestVote(votes);
    }

    getBestVote(votes) {
        let bestVote;
        let bestVoteCount = 0;

        for(let vote in votes) {
            if(votes.hasOwnProperty(vote) && votes[vote] > bestVoteCount) {
                bestVoteCount = votes[vote];
                bestVote = vote;
            }
        }

        return bestVote;
    }

    getVoteFromPrediction(prediction) {
        let bestVoteValue = 0;
        let bestVoteClass = '';

        prediction.forEach(prediction => {
            for(let oneClass in prediction) {
                if(prediction.hasOwnProperty(oneClass) && prediction[oneClass] > bestVoteValue) {
                    bestVoteValue = prediction[oneClass];
                    bestVoteClass = oneClass;
                }
            }
        });

        return bestVoteClass;
    }
};
