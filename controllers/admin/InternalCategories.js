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
    return res.status(201).json({
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
    return res.status(200).json({
      message: "Internal Categories retreived",
      data: internalCategories,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// get internal category by ID
router.get("/:id", async (req, res) => {
  try {
    const internalCategory = await DB.InternalCategory.findByPk(req.params.id);
    return res.status(200).json({
      message: "Internal Category succesfully retreived",
      data: internalCategory,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// delete internal category by ID
router.delete("/:id", async (req, res) => {
  try {
    const internalCategoryDeleted = await DB.InternalCategory.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (internalCategoryDeleted) {
      res.status(200).json({
        message: "Internal Category has been deleted",
      });
    } else {
      res.status(404).json({
        message: "Internal Category is not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// update internal category by ID
router.put("/:id", async (req, res) => {
  try {
    const newInternalCategory = req.body;
    const numberOfAffectedRows = DB.InternalCategory.update(
      newInternalCategory,
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (numberOfAffectedRows) {
      res.status(200).json({
        message: "Internal Category has been updated.",
      });
    } else {
      res.status(404).json({
        message: "Internal Category is not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
