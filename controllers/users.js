import DB from "../models";
//Now you can use DB.User / DB.Product etc....
import Express from "express";
import { restart } from "nodemon";
const router = Express.Router();

// TODO: validate get by id, post, delete by id
//       validate email: "" to null and vice versa to all

// create new user
router.post("/", async (req, res) => {
    try {
        if (req.body.email === "") { // validate empty 
            req.body.email = null;
        }
        const user = await DB.User.create(req.body);
        return res.status(201).json({
            message: "User has been created succesfully",
            data: {
                user_id: user.id,
            }
        });
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

// read all users
router.get("/", async (req, res) => {
    try {
        const users = await DB.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'email', 'email_verified', 'gender', 'dob', 'platform'],
        });
        return res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

// read user by: id
router.get("/:id", async (req, res) => {
    try {
        const user = await DB.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'email', 'email_verified', 'gender', 'dob', 'platform'],
            where: {
                id: req.params.id,
            },
        });
        if (user.length) {
            return res.status(201).json(user[0]);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

// delete user by: id
router.delete("/:id", async (req, res) => {
    try {
        const userDeleted = await DB.User.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (userDeleted) {
            return res.status(201).json({
                message: "User has been deleted succesfully",
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

// update user by: id
router.put("/:id", async (req, res) => {
    try {
        const [numberOfAffectedRows, affectedRows] = await DB.User.update(req.body, {
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
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

export default router;