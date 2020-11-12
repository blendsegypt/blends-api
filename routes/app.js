import Express from "express";
const router = Express.Router();

// import app controllers
import ProductAsUser from "../controllers/productAsUser"; // app
import ApplyPromoCodes from "../controllers/applyPromoCodes"; // app

// route controllers
router.use("/products", ProductAsUser);
router.use("/apply-promo-code", ApplyPromoCodes);

export default router;