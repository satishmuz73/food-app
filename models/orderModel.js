const mongoose = require("mongoose");

//schema
const orderSchema = new mongoose.Schema(
  {
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["preparing", "completed", "canceled","pending"], // Added 'preparing'
      default: "preparing",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", orderSchema);
