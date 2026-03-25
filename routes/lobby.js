const router = require("express").Router();
const Lobby = require("../models/Lobby");

router.post("/create", async (req, res) => {

  const { name, host, isPrivate, code, questions } = req.body;

  const lobby = await Lobby.create({
    name,
    host,
    isPrivate,
    code,
    players: [host],
    questions
  });

  res.json(lobby);
});

router.get("/public", async (req, res) => {

  const lobbies = await Lobby.find({ isPrivate: false });

  res.json(lobbies);
});

router.post("/join", async (req, res) => {

  const { lobbyId, username, code } = req.body;

  const lobby = await Lobby.findById(lobbyId);

  if (lobby.isPrivate && lobby.code !== code)
    return res.status(400).json({ msg: "Wrong Code" });

  lobby.players.push(username);

  await lobby.save();

  res.json(lobby);
});

module.exports = router;
