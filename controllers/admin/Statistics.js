import DB from "../../models";
import Express from "express";
import { calculateOrders } from "../../helpers/statistics"


const router = Express.Router();


router.get("/delivered-orders-count", async (req, res) => {
    try {
        const deliveredOrderDates = await DB.Order.findAll({
            attributes: ["updatedAt"],
            where: {
                order_status: "Delivered",
            },
            raw: true,
        });
        res.status(200).json({
            message: "delivered orders count retrieved successful",
            data: calculateOrders(deliveredOrderDates),
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


router.get("/revenue", async (req, res) => {

});


router.get("/new-users", async (req, res) => {

});


export default router;
