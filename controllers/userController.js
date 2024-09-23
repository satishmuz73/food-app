const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { param } = require("../routes/testRoutes");
const mongoose = require('mongoose');


// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id }, { _id: 0 });
    // Validation
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    // hide password
    user.password = undefined;
    // resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User APi",
      error,
    });
  }
};

// Update user
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // Validation
    if (!user) {
      return res.status(400)({
        success: false,
        message: "User not found",
      });
    }
    // update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated Successfully",
    //   user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User APi",
      error,
    });
  }
};

// Update User password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // Validation
    if (!user) {
      return res.status(400)({
        success: false,
        message: "user not found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide old and new password",
      });
    }
    // check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword
    await user.save();
    res.status(200).send({
        success: true,
        message: "User password updated Successfully",
        user,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Update APi",
      error,
    });
  }
};

// Reset Password
const resetPasswordController = async(req, res) =>{
  try{
    const {email, newPassword, answer} = req.body
    if(!email || !newPassword || !answer){
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      })
    }
    const user = await userModel.findOne({email, answer})
    if(!user){
      return res.status(500).send({
        success: false,
        message: "User not found or invilad Password",
      })
    }
    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword
    await user.save();
    res.status(200).send({
      success: true,
      message : "Password Reset Successfully",
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
      error,
    });
  }
};

// Delete Profile Account
// const deleteProfileController = async(req,res) =>{
//   try{
//     await userModel.findByIdAndDelete(req,param.id);
//     return res.send(200).send({
//       success: true,
//       message: "Your account has been deleted",
//     })
//   }catch(error){
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Delete Profile API",
//       error
//     })
//   }
// }


// Delete Profile Account
const deleteProfileController = async (req, res) => {
  try {
      const userId = req.params.id;
      await userModel.findByIdAndDelete(userId);
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// module.exports = deleteProfileController;

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
