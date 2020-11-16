import Express from "express";
const router = Express.Router();

//Auth Middleware
import authenticateUser from "../middleware/authenticateUser";

// import app controllers
import Products from "../controllers/app/Products"; // app
import ApplyPromoCodes from "../controllers/app/ApplyPromoCodes"; // app
import Register from "../controllers/app/Register";
import Login from "../controllers/app/Login";
import RefreshToken from "../controllers/app/RefreshToken";
import Orders from "../controllers/app/Orders";

// route controllers
router.use("/products", authenticate, Products);
router.use("/apply-promo-code", ApplyPromoCodes);
router.use("/register", Register);
router.use("/auth/login", Login);
router.use("/auth/refresh", RefreshToken);
router.use("/orders", authenticate, Orders);

export default router;
