const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createRestaurantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

// routes
// CREATE RESTURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTURANT || GET
router.get('/getAll',getAllResturantController )

// GET RESTURANT BY ID || GET
router.get('/get/:id',getResturantByIdController)

// DELETE RESTURANT || DELETE
router.delete('/delete/:id',authMiddleware,deleteResturantController)

module.exports = router;
