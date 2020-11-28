import DB from "../../models";
import Express from "express";
const router = Express.Router();
import { decrementRetailProductsInventory } from "../../helpers/inventory";

//create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = req.body;
    newOrder.order_status = "Received";
    //Forward to a branch
    const branch = await DB.Branch.findAll({
      include: [
        {
          model: DB.Area,
          required: true,
          through: {
            where: {
              area_id: newOrder.area_id,
            },
          },
        },
      ],
    });
    newOrder.branch_id = branch[0].id;
    const order = await DB.Order.create(newOrder, {
      include: [
        {
          model: DB.OrderItem,
          as: "OrderItems",
        },
      ],
    });
    // Modify inventory records for retail products
    await decrementRetailProductsInventory(
      order.OrderItems,
      newOrder.branch_id
    );
    res.status(201).json({
      message: "Order Created!",
      data: order,
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
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: DB.PromoCode,
          attributes: ["code"],
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
    // If order status changed
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
    // If order products/options changed
    if (updatedOrder.hasOwnProperty("OrderItems")) {
      await DB.OrderItem.destroy({
        where: {
          order_id: req.params.id,
        },
      });
      await DB.OrderItem.bulkCreate(updatedOrder.OrderItems);
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
