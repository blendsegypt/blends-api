import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = req.body;
    newOrder.order_status = "Received";
    const orderCreated = await DB.Order.create(newOrder, {
      include: [
        {
          model: DB.OrderItem,
          as: "OrderItems",
        },
      ],
    });
    res.status(201).json({
      message: "Order Created!",
      data: orderCreated,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await DB.Order.findAll({
      include: [
        {
          model: DB.User,
          attributes: ["first_name", "last_name", "phone_number"],
        },
        {
          model: DB.Address,
          attributes: ["area_id"],
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
          as: "OrderItems",
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

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = req.body;
    // Updated order status timestamp fields
    if (updatedOrder.order_status) {
      const timeNow = new Date();
      if (updatedOrder.order_status === "Preparing") {
        updatedOrder.preparing_at = timeNow;
      } else if (updatedOrder.order_status === "Delivering") {
        updatedOrder.delivering_at = timeNow;
      } else if (updatedOrder.order_status === "Delivered") {
        updatedOrder.delivered_at = timeNow;
      }
    }
    const [numberOfAffectedRows] = await DB.Order.update(updatedOrder, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedRows) {
      res.status(200).json({
        message: "Order has been updated",
      });
    } else {
      res.status(404).json({
        error_message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const orderDeleted = await DB.Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (orderDeleted) {
      res.status(200).json({
        message: "Order was successfully deleted",
      });
    } else {
      res.status(404).json({
        error_message: "Order not found",
      });
    }
  } catch (error) {}
});

export default router;
