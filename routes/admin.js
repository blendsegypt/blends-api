import Express from "express";
const router = Express.Router();

// import admin controllers
import Users from "../controllers/admin/Users"; // admin
import Branches from "../controllers/admin/Branches"; // admin
import InternalCategories from "../controllers/admin/InternalCategories"; // admin
import ProductCategories from "../controllers/admin/ProductCategories"; // admin
import Products from "../controllers/admin/Products"; // admin
import ProductCustomOptions from "../controllers/admin/ProductCustomOptions"; // admin
import ProductTags from "../controllers/admin/ProductTags"; // admin
import PromoCodes from "../controllers/admin/PromoCodes"; // admin
import Inventory from "../controllers/admin/Inventory";
import Shipments from "../controllers/admin/Shipments";
import Orders from "../controllers/admin/Orders";
import Areas from "../controllers/admin/Areas";
import Login from "../controllers/admin/Login";
import authenticateAdmin from "../middleware/authenticateAdmin";

// route admin controllers
router.use("/users", Users);
router.use("/branches", Branches);
router.use("/internal-categories", InternalCategories);
router.use("/product-categories", ProductCategories);
router.use("/products", Products);
router.use("/products-custom-options", ProductCustomOptions);
router.use("/products-tags", ProductTags);
router.use("/promo-codes", PromoCodes);
router.use("/inventory", Inventory);
router.use("/shipments", Shipments);
router.use("/orders", Orders);
router.use("/areas", Areas);
router.use("/auth/login", Login);

export default router;
