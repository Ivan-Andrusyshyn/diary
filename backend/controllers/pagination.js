const diaryPost = require("../models/diaryPost");

const onPaginate = (page, limit, userId, res) => {
  const options = {
    page: page,
    limit: limit,
  };

  diaryPost
    .paginate({ userId: userId }, options)
    .then((result) => {
      res.status(200).json({
        message: "Diary fetched successfully!",
        diaryList: result.docs,
        status: 200,
        totalItems: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
        limit: result.limit,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching Diary" });
    });
};

module.exports = { onPaginate };
