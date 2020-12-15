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
import Banners from "../controllers/admin/Banners";
import Login from "../controllers/admin/Login";
import authenticateAdmin from "../middleware/authenticateAdmin";
import adminStatisics from "../controllers/admin/Statistics";
// utilities
import ImagesUpload from "../controllers/admin/ImagesUpload";

// route admin controllers
router.use("/users", authenticateAdmin, Users);
router.use("/branches", authenticateAdmin, Branches);
router.use("/internal-categories", authenticateAdmin, InternalCategories);
router.use("/product-categories", authenticateAdmin, ProductCategories);
router.use("/products", authenticateAdmin, Products);
router.use("/products-custom-options", authenticateAdmin, ProductCustomOptions);
router.use("/products-tags", authenticateAdmin, ProductTags);
router.use("/promo-codes", authenticateAdmin, PromoCodes);
router.use("/inventory", authenticateAdmin, Inventory);
router.use("/shipments", authenticateAdmin, Shipments);
router.use("/orders", authenticateAdmin, Orders);
router.use("/areas", authenticateAdmin, Areas);
router.use("/auth/login", Login);
router.use("/statistics", authenticateAdmin, adminStatisics);
router.use("/images", authenticateAdmin, ImagesUpload);
router.use("/banners", authenticateAdmin, Banners);

export default router;
