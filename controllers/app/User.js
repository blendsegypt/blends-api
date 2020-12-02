import Express from "express";
const router = Express.Router();



// router imports
import addresses from "./addresses";

// routing middlewares
router.use("/addresses", addresses);






export default router;
