const router = require("express").Router();
const User = require("../models/User");

router.put("/avatar", async (req, res) => {

  const { userId, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true }
  );

  res.json(user);
});

module.exports = router;
