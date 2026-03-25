const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  timer: {
    type: Number,
    default: 15
  },
  points: {
    type: Number,
    default: 50
  }
});

const quizSchema = new mongoose.Schema({
  title: String,
  hostName: String,
  questions: [questionSchema]
});

module.exports = mongoose.model("Quiz", quizSchema);