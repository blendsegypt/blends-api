import DB from "../../models";
import Express from "express";
import { validateOrder } from "../../helpers/orderValidation";
const router = Express.Router();
import {
  isPromoCodeExpired,
  isMinAmountReached,
  getPromoCode,
  checkUsage,
  applyPromoCode,
} from "../../helpers/applyPromoCodes";

// make a new order
router.post("/", async (req, res) => {
  try {
    let newOrder = req.body;
    newOrder.user_id = res.locals.user_id;
    const orderValid = await validateOrder(newOrder);
    if (!orderValid) {
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
      if (
        isPromoCodeExpired(promoCode) ||
        !isMinAmountReached(newOrder.sub_total, promoCode.min_order_value) ||
        (await checkUsage(promoCode, newOrder.user_id, false)) === false
      ) {
        return res.status(400).json({
          error: "INVALID_ORDER",
        });
      }
      newOrder.promocode_id = promoCode.id;
      newOrder = applyPromoCode(promoCode, newOrder);
    }
    await DB.Order.create(newOrder, {
      include: [
        {
          model: DB.OrderItem,
          as: "OrderItems",
        },
      ],
    });
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
      attributes: ["id", "order_status", "createdAt", "delivered_at"],
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

//Get recent ordered items
router.get("/recent", async (req, res) => {
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

export default router;
