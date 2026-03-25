const express = require("express");
const router = express.Router();

const { createQuiz,updateQuiz } = require("../controllers/quizController");

router.post("/create", createQuiz);
router.put("/update/:id", updateQuiz);

module.exports = router;