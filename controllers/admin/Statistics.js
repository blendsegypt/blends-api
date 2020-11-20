import DB from "../../models";
import Express from "express";
import { countUsers, calculateRevenue, countOrders } from "../../helpers/statistics"


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
        const ordersStatistics = countOrders(deliveredOrderDates);
        res.status(200).json({
            message: "Delivered orders count retrieved successful",
            data: ordersStatistics,
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
        const revenueStatistics = calculateRevenue(deliveredOrders);
        res.status(200).json({
            message: "Revenue retrieved successful",
            data: revenueStatistics,
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
        const usersStatistics = countUsers(usersCreationDates);
        res.status(200).json({
            message: "Users creation count retrieved successful",
            data: usersStatistics,
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


export default router;
