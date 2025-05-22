module.exports.getQuiz = function getQuiz(req, res) {
    res.send([
    {
        "question": "What is the capital of france?",
        "answers" : ["Rome","Madrid","Paris","London"],
        "correct": 2
    }
    ]);
}

