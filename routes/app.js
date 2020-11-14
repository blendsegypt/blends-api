import Express from "express";
const router = Express.Router();

//Auth Middleware
import authenticate from "../middleware/authenticate";

// import app controllers
import ProductAsUser from "../controllers/productAsUser"; // app
import ApplyPromoCodes from "../controllers/applyPromoCodes"; // app
import Register from "../controllers/register";
import UserLogin from "../controllers/userLogin";
import RefreshToken from "../controllers/refreshToken";

// route controllers
router.use("/products", authenticate, ProductAsUser);
router.use("/apply-promo-code", ApplyPromoCodes);
router.use("/register", Register);
router.use("/auth/login", UserLogin);
router.use("/auth/refresh", RefreshToken);

export default router;
