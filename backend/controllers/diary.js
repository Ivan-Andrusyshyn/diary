const diaryPost = require("../models/diaryPost");
const { onPaginate } = require("./pagination");
// GET all diary posts for the authenticated user paginated
const getAllDiaryPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    onPaginate(page, limit, res);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching diary posts", status: 500 });
  }
};
const getDiaryPostsByMonth = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const diaryPosts = await diaryPost.find({
      userId,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    res.status(200).json({ diaryDatesPosts: diaryPosts, status: 200 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching diary posts", status: 500 });
  }
};

const getDiaryPostsByKeyword = async (req, res, next) => {
  const userId = req.userData._id;

  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      message: "Keyword is required",
      status: 400,
    });
  }

  try {
    const regex = new RegExp(keyword, "i");
    const diaryPosts = await diaryPost.find({
      userId,
      $or: [
        { userDescribe: { $regex: regex } },
        { imgTitle: { $regex: regex } },
        { imgAlt: { $regex: regex } },
      ],
    });
    console.log(diaryPosts);

    res.status(200).json({ diaryPosts, status: 200 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching diary posts", status: 500 });
  }
};

// DELETE a diary post by ID
const deleteDiaryPost = (req, res, next) => {
  const postId = req.params.id;
  diaryPost
    .deleteOne({ _id: postId })
    .then((result) => {
      res.status(200).json({ message: "Post deleted!" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Спробуйте видалити запис пізніше.", status: 500 });
    });
};

// CREATE a new diary post
const createDiaryPost = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const today = new Date().setHours(0, 0, 0, 0);
    const existingPost = await diaryPost.findOne({
      userId: userId,
      createdAt: {
        $gte: today,
      },
    });

    if (existingPost) {
      return res.status(400).json({
        status: 400,
        message: "Для успіху вам потрібен лише один запис на день.😊",
      });
    }
    const newDiaryPost = new diaryPost({
      userDescribe: req.body.userDescribe,
      imgUrl: req.body.imgUrl,
      imgTitle: req.body.imgTitle,
      imgAlt: req.body.imgAlt,
      userId: userId,
    });

    const createdPost = await newDiaryPost.save();

    res.status(201).json({
      message: "Diary Post added!",
      status: 201,
      createdPost: createdPost,
      createdPostId: createdPost._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Помилка створення поста, спробуйте пізніше.",
    });
  }
};

// UPDATE an existing diary post by ID
const updateDiaryPost = async (req, res, next) => {
  const diaryPostId = req.params["id"];

  try {
    const updatedDiaryPost = {
      userDescribe: req.body.userDescribe,
      imgUrl: req.body.imgUrl,
      imgTitle: req.body.imgTitle,
      imgAlt: req.body.imgAlt,
    };
    console.log(updatedDiaryPost);

    const result = await diaryPost.updateOne(
      { _id: diaryPostId },
      updatedDiaryPost
    );

    res.status(200).json({
      message: "Update successful!",
      post: { ...updatedDiaryPost, _id: diaryPostId },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Спробуйте оновити запис пізніше.", status: 500 });
  }
};

module.exports = {
  deleteDiaryPost,
  getAllDiaryPosts,
  createDiaryPost,
  getDiaryPostsByKeyword,
  updateDiaryPost,
  getDiaryPostsByMonth,
};
