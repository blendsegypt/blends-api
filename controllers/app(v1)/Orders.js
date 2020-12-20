import DB from "../../models";
import Express from "express";
import { validateOrder } from "../../helpers/orderValidation";
const router = Express.Router();
import {
  checkCodeUsage,
  getPromoCode,
  applyPromoCodeOnTable,
  applyPromoCodeOnOrder,
} from "../../helpers/applyPromoCodes";
import { decrementRetailProductsInventory } from "../../helpers/inventory";

// make a new order
router.post("/", async (req, res) => {
  try {
    let newOrder = req.body;
    newOrder.user_id = res.locals.user_id;
    const orderValid = await validateOrder(newOrder);
    if (!orderValid) {
      console.log(newOrder);
      console.log("Order calculations failed");
      return res.status(400).json({
        error: "INVALID_ORDER",
      });
    }
    newOrder.order_status = "Received";
    // Check if there's a promocode then apply it
    if (newOrder.promo_code) {
      // Get promocode from DB
      const promoCode = await getPromoCode(newOrder);
      // Check if promocode is valid or not
      if (promoCode !== null) {
        const codeUsage = checkCodeUsage(promoCode, order);
        if (!codeUsage.isUsable) {
          console.log("Order promocode checks failed");
          return res.status(400).json({
            error: "INVALID_ORDER",
          });
        }
      }
      // apply promoCode changes on DB
      // - apply on reciept
      if (await applyPromoCodeOnTable(promoCode, newOrder.user_id)) {
        newOrder.promocode_id = promoCode.id;
        newOrder = applyPromoCodeOnOrder(promoCode, newOrder);
      }
    }
    // Check if wallet is used
    if (newOrder.walletUsed) {
      const user = await DB.User.findOne({
        where: {
          id: res.locals.user_id,
        },
        attributes: ["id", "wallet"],
      });
      const totalAfterWallet = newOrder.total - user.wallet;
      if (totalAfterWallet <= 0) {
        // Not all money in wallet was used
        newOrder.total = 0;
        user.wallet = Math.abs(totalAfterWallet);
      } else {
        // Wallet is empty
        newOrder.total = totalAfterWallet;
        user.wallet = 0;
      }
      await user.save();
    }
    await DB.Order.create(newOrder, {
      include: [
        {
          model: DB.OrderItem,
          as: "OrderItems",
        },
      ],
    });
    // Modify inventory records for retail products
    await decrementRetailProductsInventory(
      newOrder.OrderItems,
      newOrder.branch_id
    );
    res.status(200).json({
      message: "Order Created succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//Retrieve user orders
router.get("/", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const orders = await DB.Order.findAll({
      where: {
        user_id,
      },
      attributes: ["id", "order_status", "createdAt", "delivered_at", "rating"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "Orders retrieved succesfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//Retrieve order by ID
router.get("/order/:id", async (req, res) => {
  try {
    const order_id = req.params.id;
    const order = await DB.Order.findOne({
      where: {
        id: order_id,
      },
      attributes: [
        "id",
        "order_status",
        "createdAt",
        "delivered_at",
        "total",
        "sub_total",
        "delivery_charges",
      ],
      include: [
        {
          model: DB.Address,
          attributes: ["nickname"],
        },
        {
          as: "OrderItems",
          model: DB.OrderItem,
          include: [
            {
              model: DB.Product,
              attributes: ["name", "product_image_url"],
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
      message: "Order retrieved succesfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//Get recent ordered items (branch_id is supplied to include products stock)
router.get("/recent/branch/:branch_id", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const recentOrders = await DB.Order.findAll({
      where: {
        user_id,
      },
      limit: 5,
      order: [["createdAt", "DESC"]],
      attributes: ["createdAt"],
      include: [
        {
          as: "OrderItems",
          model: DB.OrderItem,
          attributes: ["id"],
          include: [
            {
              model: DB.Product,
              attributes: [
                "id",
                "name",
                "product_image_url",
                "retail",
                "price",
                "sale_price",
              ],
              include: [
                {
                  required: false,
                  model: DB.Inventory,
                  attributes: ["actual_stock", "branch_id"],
                  where: {
                    branch_id: req.params.branch_id,
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Recent Orders succesfully retrieved",
      data: recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//rate an order
router.post("/rate/:order_id", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const order_id = req.params.order_id;
    const rating = req.body.rating;
    // Check if order belongs to user
    const order = await DB.Order.findOne({
      where: {
        user_id,
        id: order_id,
      },
    });
    // No orders matched
    if (!order) {
      res.status(404).json({
        message: "No order found",
      });
    }
    // Check if rating is valid
    if (isNaN(rating) || rating > 5) {
      res.status(400).json({
        message: "Unsupported rating",
      });
    }
    // Order/rating are valid
    await order.update({
      rating,
    });

    res.status(200).json({
      message: "Order succesfully rated",
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
