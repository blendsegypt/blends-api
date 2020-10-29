import DB from "../models";
//Now you can use DB.User / DB.Product etc....
import Express from "express";
import { restart } from "nodemon";
const router = Express.Router();

// TODO: validate get by id, post, delete by id

router.post("/", async (req, res) => { // create new user
    try {
        // console.log(req.body);
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

router.get("/", async (req, res) => { // read all users
    try {
        const users = await DB.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'email', 'email_verified', 'gender', 'dob', 'platform'],
        });
        console.log(users);
        return res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

router.get("/:id", async (req, res) => { // read user by: id
    try {
        const user = await DB.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'email', 'email_verified', 'gender', 'dob', 'platform'],
            where: {
                id: req.params.id,
            },
        });
        console.log(user);
        return res.status(201).json(user[0]);
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

router.delete("/:id", async (req, res) => { // delete user by: id
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
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

router.put("/:id", async (req, res) => { // update user by: id
    try {
        const [numberOfAffectedRows, affectedRows] = await DB.User.update(req.body, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });
        console.log("numberOfAffectedRows: " + numberOfAffectedRows + " affectedRows: " + affectedRows);
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