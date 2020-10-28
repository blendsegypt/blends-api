import DB from "../models";
//Now you can use DB.User / DB.Product etc....
import Express from "express";
const router = Express.Router();

// TODO: validate get by id, post

router.post("/", async (req, res) => { // create new user
    try {
        // console.log(req.body);
        const user = await DB.User.create(req.body);
        return res.status(201).json({
            message: "User has been created succesfully",
            user_id: user.id,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => { // read all users
    try {
        const users = await DB.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'email', 'email_verified', 'gender', 'dob', 'platform'],
        });
        console.log(users);
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error_message });
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
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error_message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = DB.User.destroy({
            where: {
                id: req.params.id,
            }
        });
        console.log(user);
        return res.status(201).json({
            message: "User has been deleted succesfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error_message });
    }
})

export default router;