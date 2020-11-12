import Express from "express";
const router = Express.Router();
import { isPromoCodeExpired, isMinAmountReached, getPromoCode, checkUsage, applyPromoCode } from "../helpers/applyPromoCodes";


// apply promo code
router.post("/", async (req, res) => {
    try {
        const order = req.body;
        const promoCode = await getPromoCode(order);

        if (promoCode != null) { // promo code exists
            if (isPromoCodeExpired(promoCode)) {
                return res.status(201).json({
                    message: "Promo code is expired",
                });
            }
            if (!isMinAmountReached(order.sub_total, promoCode.min_order_value)) {
                return res.status(201).json({
                    message: `Order value must be at least: ${promoCode.min_order_value}EGP`,
                });
            }
            if (await checkUsage(promoCode, order.user_id) === false) {
                return res.status(201).json({
                    message: "Promo code can't be used, reached maximum number of attempts",
                });
            }
            const newOrder = applyPromoCode(promoCode, order);
            return res.status(201).json({
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