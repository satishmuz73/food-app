const { deleteModel } = require("mongoose");
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD
const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvaliable,
      resturant,
      rating,
    } = req.body;

    // validation
    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvaliable,
      resturant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "Food created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error is Create food APi",
      error,
    });
  }
};

// GET ALL FOOD
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GEt All Foods API",
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Single Food API",
      error,
    });
  }
}; // GET FOOD BY RESTURENT
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide id",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food base on resturent",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Single Food API",
      error,
    });
  }
};

// UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;

    // Check if foodID is provided
    if (!foodID) {
      return res.status(400).send({
        success: false,
        message: "No food ID was found",
      });
    }

    // Find the food item by ID
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    // Destructure the body
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable, // Fixed typo from isAvaliable to isAvailable
      restaurant,  // Fixed typo from resturant to restaurant
      rating,
    } = req.body;

    // Update the food item
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );

    // Respond with the updated food item
    res.status(200).send({
      success: true,
      message: "Food Item was updated",
      // data: updatedFood,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async(req,res) =>{
  try{
    const foodID = req.params.id
    if(!foodID){
      return res.status(404).send({
        success: false,
        message: "Provide food id",
      });
    }
    const food = await foodModel.findById(foodID)
    if(!food){
      return res.status(400).send({
        success: false,
        message: "No food found with id"
      })
    }
    await foodModel.findByIdAndDelete(foodID)
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food API",
      error,
    });
  }
}

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
      // status: 'preparing',
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async(req,res) =>{
  try{
    const orderId = req.params.id
    if(!orderId){
      return res.status(404).send({
        success: false,
        message: "Please provide valid order id",
      });
    }
    const {status} = req.body
    const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).send({
      success:true,
      message: "Order Status Updated Successfully",
      order,
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order status API"
    })
  }
}

// module
module.exports = {
  createFood,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
