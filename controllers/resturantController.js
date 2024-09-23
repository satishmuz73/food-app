const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// GET ALL RESTURANT
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (eror) {
    console.log(eror);
    res.status(500).send({
      success: false,
      message: "Error In Get All Resturant api",
      error,
    });
  }
};

// GET RESTURANT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant Not Found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturant By Id api",
      error,
    });
  }
};

// DELETE RESTURANT
const deleteResturantController = async(req,res) => {
  try{
    const resturantId = req.params.id
    if(!resturantId){
      return res.status(400).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      })
    }
    await resturantModel.findByIdAndDelete(resturantId);
    if(!resturantId){
      return res.status(200).send({
        success:false,
        message:"Please Provide Resturant ID",
      })
    }

  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Resturant api",
      error,
    })
  }
};

module.exports = {
  createRestaurantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
