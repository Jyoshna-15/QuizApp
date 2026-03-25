const Quiz = require("../models/quiz");

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        questions: req.body.questions
      },
      { new: true }
    );

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};