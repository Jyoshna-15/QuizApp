const Room = require("../models/room");

function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      roomCode: generateRoomCode(),
      quizId: req.body.quizId,
      hostName: req.body.hostName
    });

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.body.roomCode });

    room.players.push({
      name: req.body.playerName
    });

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};