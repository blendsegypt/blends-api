import Express from "express";
const router = Express.Router();

//Auth Middleware
import authenticateUser from "../middleware/authenticateUser";

// import app controllers
import Products from "../controllers/app/Products"; // app
import ApplyPromoCodes from "../controllers/app/ApplyPromoCodes"; // app
import Register from "../controllers/app/Register";
import Login from "../controllers/app/Login";
import Logout from "../controllers/app/Logout";
import RefreshToken from "../controllers/app/RefreshToken";
import Orders from "../controllers/app/Orders";
import Areas from "../controllers/app/Areas";
import Banners from "../controllers/app/Banners";
import Branch from "../controllers/app/Branch";

// route controllers
router.use("/products", Products);
router.use("/apply-promo-code", ApplyPromoCodes);
router.use("/register", Register);
router.use("/auth/login", Login);
router.use("/auth/logout", authenticateUser, Logout);
router.use("/auth/refresh", RefreshToken);
router.use("/orders", authenticateUser, Orders);
router.use("/areas", Areas);
router.use("/banners", Banners);
router.use("/branch", Branch);

export default router;
