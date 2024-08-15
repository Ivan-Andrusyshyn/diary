const express = require("express");
const {
  deleteDiaryPost,
  getAllDiaryPosts,
  createDiaryPost,
  updateDiaryPost,
  getDiaryPostsByKeyword,
} = require("../controllers/diary");
const { authenticate } = require("../middlewares/auth");

const diaryRouter = express.Router();

diaryRouter.put("/:id", authenticate, updateDiaryPost);
diaryRouter.post("/", authenticate, createDiaryPost);
diaryRouter.delete("/:id", authenticate, deleteDiaryPost);
diaryRouter.get("/", authenticate, getAllDiaryPosts);
diaryRouter.get("/query", authenticate, getDiaryPostsByKeyword);

module.exports = diaryRouter;
