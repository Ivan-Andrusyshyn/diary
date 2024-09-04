const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const diaryPostSchema = mongoose.Schema(
  {
    userDescribe: { type: String, require: true },
    imgUrl: { type: String, require: true },
    imgTitle: { type: String, require: true },
    imgAlt: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
diaryPostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("diary-post", diaryPostSchema);
