import DB from "../models";
//Now you can use DB.User / DB.Product etc....
import Express from "express";
const router = Express.Router();

router.get("/", () => {

});

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
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