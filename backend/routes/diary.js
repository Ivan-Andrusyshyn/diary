const express = require("express");
const {
  deleteDiaryPost,
  getAllDiaryPosts,
  createDiaryPost,
  updateDiaryPost,
  getDiaryPostsByKeyword,
  getDiaryPostsByMonth,
} = require("../controllers/diary");
const { authenticate } = require("../middlewares/auth");

const diaryRouter = express.Router();

diaryRouter.get("/calendar", authenticate, getDiaryPostsByMonth);

diaryRouter.put("/:id", authenticate, updateDiaryPost);
diaryRouter.post("/", authenticate, createDiaryPost);
diaryRouter.delete("/:id", authenticate, deleteDiaryPost);
diaryRouter.get("/", authenticate, getAllDiaryPosts);
diaryRouter.get("/query", authenticate, getDiaryPostsByKeyword);

module.exports = diaryRouter;
