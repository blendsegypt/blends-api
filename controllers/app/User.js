import Express from "express";
import DB from "../../models";
import { validateFieldsOnUpdate } from "../../helpers/users";
import Addresses from "./Addresses";
const router = Express.Router();

// Subrouting addresses with user
router.use("/addresses", Addresses);

// Get user personal information
router.get("/", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const user = await DB.User.findOne({
      where: {
        id: user_id,
      },
      attributes: ["first_name", "last_name", "dob", "gender", "wallet"],
    });

    // If no users exist with supplied id
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User retrieved succesfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

// Update user personal information
router.put("/", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const newUser = req.body;
    const { first_name, last_name, dob, gender } = newUser;
    if (!validateFieldsOnUpdate(first_name, last_name, dob, gender)) {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }

    // Update user info
    await DB.User.update(newUser, {
      where: {
        id: user_id,
      },
    });

    res.status(200).json({
      message: "User data has been updated succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
