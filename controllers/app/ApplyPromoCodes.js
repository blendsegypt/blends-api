import Express from "express";
const router = Express.Router();
import {
  isPromoCodeExpired,
  isMinAmountReached,
  getPromoCode,
  checkUsage,
  applyPromoCode,
} from "../../helpers/applyPromoCodes";

// apply promo code
router.post("/", async (req, res) => {
  try {
    const order = req.body;
    const promoCode = await getPromoCode(order);

    if (promoCode != null) {
      // promo code exists
      if (isPromoCodeExpired(promoCode)) {
        return res.status(400).json({
          message: "This Promocode is expired",
        });
      }
      if (!isMinAmountReached(order.sub_total, promoCode.min_order_value)) {
        return res.status(400).json({
          message: `Order value must be at least: ${promoCode.min_order_value} EGP`,
        });
      }
      // Check usage (preview=true)
      if ((await checkUsage(promoCode, order.user_id, true)) === false) {
        return res.status(400).json({
          message:
            "Promo code can't be used, reached maximum number of attempts",
        });
      }
      const newOrder = applyPromoCode(promoCode, order);
      return res.status(200).json({
        message: "Promo code applied succesfully",
        order: newOrder,
      });
    } else {
      return res.status(404).json({
        message: "Promo code doesn't exist",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
