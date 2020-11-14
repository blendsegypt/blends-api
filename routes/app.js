import Express from "express";
const router = Express.Router();

// import app controllers
import ProductAsUser from "../controllers/productAsUser"; // app
import ApplyPromoCodes from "../controllers/applyPromoCodes"; // app
import Users from "../controllers/usersAsApp";

// route controllers
router.use("/products", ProductAsUser);
router.use("/apply-promo-code", ApplyPromoCodes);
router.use("/users", Users);

export default router;
