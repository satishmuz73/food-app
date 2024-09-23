const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://img.freepik.com/premium-vector/food-ordering-app-logo-with-points-fork-shapes-center_666184-195.jpg"
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Cetegory", categorySchema);
