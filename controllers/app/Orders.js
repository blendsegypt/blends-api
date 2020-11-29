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
      if (promoCode !== null) {
        const codeUsage = checkCodeUsage(promoCode, order);
        if (!codeUsage.isUsable) {
          return res.status(400).json({
            error: "INVALID_ORDER",
          });
        }
      }
      newOrder.promocode_id = promoCode.id;
      newOrder = applyPromoCodeOnOrder(promoCode, newOrder);
      await applyPromoCodeOnTable(promoCode, newOrder.user_id);
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

export default router;
