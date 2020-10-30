import DB from "../models";
import Express from "express";
const router = Express.Router();

// create new internal category
router.post("/", async (req, res) => {
  try {
    const internalCategory = req.body;
    const newInternalCategory = await DB.InternalCategory.create(
      internalCategory
    );
    return res.status(200).json({
      message: "Internal Category has been created",
      data: {
        internalCategory: newInternalCategory,
      },
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// list all internal categories
router.get("/", async (req, res) => {
  try {
    const internalCategories = await DB.InternalCategory.findAll();
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// get internal category by ID
router.get("/:id", async (req, res) => {});

// delete internal category by ID
router.delete("/:id", async (req, res) => {});

// update internal category by ID
router.put("/:id", async (req, res) => {});

export default router;
