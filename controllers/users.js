import DB from "../models";
//Now you can use DB.User / DB.Product etc....
import Express from "express";
const router = Express.Router();


// attributes: ['id', 'first_name', 'last_name', 'phone_number', 'phone_number_verified', 'email', 'email_verified', 'gender', 'dob', 'platform'],


router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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
})

export default router;