const Room = require("./models/room");
const Quiz = require("./models/quiz");

module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("joinRoom", ({ roomCode, playerName }) => {
      socket.join(roomCode);
      io.to(roomCode).emit("playerJoined", playerName);
    });

    socket.on("startQuiz", async ({ roomCode }) => {
      const room = await Room.findOne({ roomCode });
      const quiz = await Quiz.findById(room.quizId);

      let current = 0;

      const sendQuestion = async () => {
        if (current >= quiz.questions.length) {
          io.to(roomCode).emit("quizEnded");
          return;
        }

        room.currentQuestion = current;
        await room.save();

        io.to(roomCode).emit("newQuestion", quiz.questions[current]);

        let time = 15;

        const timer = setInterval(() => {
          io.to(roomCode).emit("timer", time);
          time--;

          if (time < 0) {
            clearInterval(timer);
            current++;
            sendQuestion();
          }
        }, 1000);
      };

      sendQuestion();
    });

    socket.on("submitAnswer", async ({ roomCode, playerName, answer }) => {
      const room = await Room.findOne({ roomCode });
      const quiz = await Quiz.findById(room.quizId);

      const currentQuestionIndex = room.currentQuestion;
      const currentQuestion = quiz.questions[currentQuestionIndex];

      const player = room.players.find(p => p.name === playerName);

      if (player && currentQuestion.correctAnswer === answer) {
        player.score += currentQuestion.points;
      }

      await room.save();

      io.to(roomCode).emit("leaderboard", room.players);
    });

  });
};