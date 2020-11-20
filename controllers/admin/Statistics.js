import DB from "../../models";
import Express from "express";
import { calculateOrders, calculateRevenue, calculateUsers } from "../../helpers/statistics"


const router = Express.Router();


router.get("/delivered-orders", async (req, res) => {
    try {
        const deliveredOrderDates = await DB.Order.findAll({
            attributes: ["updatedAt"],
            where: {
                order_status: "Delivered",
            },
            raw: true,
        });
        res.status(200).json({
            message: "Delivered orders count retrieved successful",
            data: calculateOrders(deliveredOrderDates),
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


router.get("/revenue", async (req, res) => {
    try {
        const deliveredOrders = await DB.Order.findAll({
            attributes: ["total", "updatedAt"],
            where: {
                order_status: "Delivered",
            },
            raw: true,
        });
        res.status(200).json({
            message: "Revenue retrieved successful",
            data: calculateRevenue(deliveredOrders),
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


router.get("/created-users", async (req, res) => {
    try {
        const usersCreationDates = await DB.User.findAll({
            attributes: ["createdAt"],
            raw: true,
        });
        res.status(200).json({
            message: "Users creation count retrieved successful",
            data: calculateUsers(usersCreationDates),
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


export default router;
