// CREATE CATEGROY

const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please Provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating category",
      error,
    });
  }
};

// GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Category API",
      error,
    });
  }
};

// UPDATE CATEGORY
const updateCategoryController = async(req,res) => {
    try{
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success: false,
                message: "No Category Found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update category api",
            error
        })
    }
};

// DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id; // Get the category ID from the request parameters

        if (!categoryId) {
            return res.status(400).send({
                success: false,
                message: "Category ID is required.",
            });
        }
        const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found.",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category deleted successfully.",
            deletedCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error,
        });
    }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
