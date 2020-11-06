import Express from "express";
const router = Express.Router();

// import app controllers
import ProductAsUser from "../controllers/productAsUser"; // app

// route controllers
router.use("/products", ProductAsUser);

export default router;