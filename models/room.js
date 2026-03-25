const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomCode: String,
  quizId: String,
  hostName: String,
  players: [
    {
      name: String,
      score: {
        type: Number,
        default: 0
      }
    }
  ],
  currentQuestion: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "waiting"
  }
});

module.exports = mongoose.model("Room", roomSchema);