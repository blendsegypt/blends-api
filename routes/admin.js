import Express from "express";
const router = Express.Router();

// import admin controllers
import UserController from "../controllers/users"; // admin
import Branches from "../controllers/branches"; // admin
import InternalCategoriesController from "../controllers/internalCategories"; // admin
import ProductCategoriesController from "../controllers/productCategories"; // admin
import ProductsAsAdmin from "../controllers/productsAsAdmin"; // admin
import ProductCustomOptions from "../controllers/productCustomOptions"; // admin
import ProductTags from "../controllers/productTags"; // admin

// route admin controllers
router.use("/users", UserController);
router.use("/branches", Branches);
router.use("/internal-categories", InternalCategoriesController);
router.use("/product-categories", ProductCategoriesController);
router.use("/products", ProductsAsAdmin);
router.use("/products-custom-options", ProductCustomOptions);
router.use("/products-tags", ProductTags);

export default router;