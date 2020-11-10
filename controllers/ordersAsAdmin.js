import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = req.body;
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = DB.Order.findAll({
      include: [
        {
          model: DB.User,
          attributes: ["name", "phone_number"],
        },
        {
          model: DB.Address,
          attributes: [],
          include: [
            {
              model: DB.Area,
              attributes: ["name"],
            },
          ],
        },
        {
          model: DB.Branch,
          attributes: ["name"],
        },
        {
          model: DB.OrderItem,
          attributes: ["quantity", "options"],
          include: [
            {
              model: DB.Product,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Orders has been succesfully retrieved",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
