import DB from "../../models";
import Express from "express";
const router = Express.Router();

//get all areas
router.get("/", async (req, res) => {
  try {
    const areas = await DB.Area.findAll();
    res.status(200).json({
      message: "Areas retrieved succesfully",
      data: areas,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//add a new area
router.post("/", async (req, res) => {
  try {
    const area = req.body;
    await DB.Area.create(area);
    res.status(201).json({
      message: "Area created succesfully",
      data: area,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update area
router.put("/:id", async (req, res) => {
  try {
    const newArea = req.body;
    const [numberOfAffectedRows] = await DB.Area.update(newArea, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedRows) {
      res.status(200).json({
        message: "Area updated succesfully",
      });
    } else {
      res.status(404).json({
        error_message: "Area not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//delete area
router.delete("/:id", async (req, res) => {
  try {
    const areaDeleted = await DB.Area.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (areaDeleted) {
      res.status(200).json({
        message: "Area deleted succesfully",
      });
    } else {
      res.status(404).json({
        error_message: "Area not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
