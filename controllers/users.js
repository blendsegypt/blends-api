import DB from "../models";
import Express from "express";
import { checkIfExists } from "../helpers/users";
const router = Express.Router();

// router imports
import addresses from "./addresses"

// routing middlewares
router.use("/:user_id/addresses", addresses);

// create new user
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const isValidated = await checkIfExists(user);
    user.email = user.email === "" ? null : user.email; //Convert "" to strict null
    // Check pre-db validation
    if (isValidated.flag) {
      const newUser = await DB.User.create(user);
      return res.status(201).json({
        message: "User has been created succesfully",
        data: {
          user_id: newUser.id,
        },
      });
    } else {
      return res
        .status(400)
        .json({
          error_message: isValidated.message,
          errors: isValidated.errors,
        });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// read all users
router.get("/", async (req, res) => {
  try {
    const users = await DB.User.findAll({
      attributes: {
        excludes: ["password_hash", "password_salt"],
      },
    });
    return res.status(201).json({
      message: "Users Retreived successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// read user by: id
router.get("/:id", async (req, res) => {
  try {
    const user = await DB.User.findAll({
      attributes: {
        excludes: [password_hash, password_salt],
      },
      where: {
        id: req.params.id,
      },
    });
    if (user.length > 0) {
      return res.status(201).json({
        message: "User has been retreived succesfully",
        data: user[0],
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// delete user by: id
router.delete("/:id", async (req, res) => {
  try {
    const userDeleted = await DB.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (userDeleted) {
      return res.status(201).json({
        message: "User has been deleted succesfully",
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// update user by: id
router.put("/:id", async (req, res) => {
  try {
    const user = req.body;
    const isValidated = await checkIfExists(user);
    user.email = user.email === "" ? null : user.email; //Convert "" to strict null
    if (isValidated.flag) {
      const numberOfAffectedRows = await DB.User.update(user, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      if (numberOfAffectedRows) {
        return res.status(201).json({
          message: "User Data has been updated succesfully",
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res
        .status(400)
        .json({
          error_message: isValidated.message,
          exact_errors: isValidated.errors,
        });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

export default router;
