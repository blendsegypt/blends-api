import Express from "express";
const router = Express.Router();

//Auth Middleware
import authenticateUser from "../middleware/authenticateUser";

// import app controllers
import Products from "../controllers/app(v1)/Products"; // app
import ApplyPromoCodes from "../controllers/app(v1)/ApplyPromoCodes"; // app
import Register from "../controllers/app(v1)/Register";
import Login from "../controllers/app(v1)/Login";
import LoginByFacebook from "../controllers/app(v1)/LoginByFacebook";
import Logout from "../controllers/app(v1)/Logout";
import RefreshToken from "../controllers/app(v1)/RefreshToken";
import Orders from "../controllers/app(v1)/Orders";
import Areas from "../controllers/app(v1)/Areas";
import Banners from "../controllers/app(v1)/Banners";
import Branch from "../controllers/app(v1)/Branch";
import User from "../controllers/app(v1)/User";

// route controllers
router.use("/products", Products);
router.use("/apply-promo-code", ApplyPromoCodes);
router.use("/register", Register);
router.use("/auth/login", Login);
router.use("/auth/facebook", LoginByFacebook);
router.use("/auth/logout", authenticateUser, Logout);
router.use("/auth/refresh", RefreshToken);
router.use("/orders", authenticateUser, Orders);
router.use("/areas", Areas);
router.use("/banners", Banners);
router.use("/branch", Branch);
router.use("/user", authenticateUser, User);

export default router;
