import Express from "express";
const router = Express.Router();
import {
  getPromoCode,
  checkCodeUsage,
  checkUserUsage,
  applyPromoCodeOnOrder,
} from "../../helpers/applyPromoCodes";

// apply promo code
router.post("/", async (req, res) => {
  try {
    const order = req.body;
    const promoCode = await getPromoCode(order);

    if (promoCode != null) {
      const codeUsage = checkCodeUsage(promoCode, order);
      if (!codeUsage.isUsable) {
        return res.status(400).json({
          message: codeUsage.message,
        });
      }
      // Check user usage of promocode
      if ((await checkUserUsage(promoCode, order.user_id)) === false) {
        return res.status(400).json({
          message:
            "Promo code can't be used, reached maximum number of attempts",
        });
      }
      const newOrder = applyPromoCodeOnOrder(promoCode, order);
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
