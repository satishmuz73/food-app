const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required: [true, "Food Title is required"]
    },
    description:{
        type:String,
        required: [true, "Food description is required"],
    },
    price:{
        type: Number,
        required:[true, "Food price is required"]
    },
    imageUrl:{
        type:String,
        default: "https://img.freepik.com/premium-vector/food-ordering-app-logo-with-points-fork-shapes-center_666184-195.jpg",
    },
    foodTags:{
        type: String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvaliable:{
        type:Boolean,
        default: true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    rating:{
        type:Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount:{
        type:String,
    }
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
