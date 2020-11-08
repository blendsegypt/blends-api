// TODO: Refracture PUT
import DB from "../models";
import Express from "express";
const router = Express.Router();


// create new branch
router.post("/", async (req, res) => {
    try {
        const branch = req.body;
        // create new branch 
        const newBranch = await DB.Branch.create(
            branch,
            { include: [{ model: DB.WorkingHours, as: "working_hours" }] }, // create new entries in WorkingHours with branch_id
        );
        await newBranch.addAreas(branch.SupportedAreas); // create new entries in SupportedAreas with branch_id & address_id
        return res.status(201).json({
            message: "Branch has been succesfully created",
            data: newBranch,
        });
    } catch (error) {
        return res.status(500).json({ error_message: error.message, });
    }
});

// read all branches
router.get("/", async (req, res) => {
    try {
        const branches = await DB.Branch.findAll({
            include: [
                // get attributes from WorkingHours table
                {
                    model: DB.WorkingHours,
                    as: "working_hours",
                    attributes: ["id", "days", "opens_at", "closes_at"],
                },
                // get attributes from Area through SupportedArea
                {
                    model: DB.Area,
                    attributes: ["id", "name"],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });
        res.status(200).json({
            message: "Branches succesfully retreived",
            data: branches,
        });
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});

// read branch by :id
router.get("/:id", async (req, res) => {
    try {
        const branch = await DB.Branch.findOne({
            include: [
                // get attributes from WorkingHours table
                {
                    model: DB.WorkingHours,
                    as: "working_hours",
                    attributes: ["id", "days", "opens_at", "closes_at"],
                },
                // get attributes from Area through SupportedArea
                {
                    model: DB.Area,
                    attributes: ["id", "name"],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: req.params.id,
            },
        });
        if (branch !== null) {
            res.status(200).json({
                message: "Branch has been succesfully retreived",
                data: branch,
            });
        } else {
            res.status(404).json({ message: "Branch not found" });
        }
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});

// update branch by :id
router.put("/:id", async (req, res) => {
    try {
        const branchUpdates = req.body;
        let isWorkingHoursUpdated = false;
        let isSupportedAreasUpdated = false;
        // update branch
        const [numberOfAffectedRows] = await DB.Branch.update(
            branchUpdates,
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
            }
        );
        // delete old working hours and update with new if exists in the request
        if (branchUpdates.hasOwnProperty('working_hours')) {
            // add parameter BranchId to WorkingHours sub-object
            for (let i = 0; i < branchUpdates.working_hours.length; i++) {
                branchUpdates.working_hours[i].branch_id = req.params.id;
            }
            const workingHoursDeleted = await DB.WorkingHours.destroy({
                where: {
                    branch_id: req.params.id,
                },
            });
            const newWorkingHours = await DB.WorkingHours.bulkCreate(
                branchUpdates.working_hours, { returning: true });
            if (newWorkingHours.length > 0 || workingHoursDeleted)
                isWorkingHoursUpdated = true;
        }
        // delete old supported areas and update with new if exists in the request
        if (branchUpdates.hasOwnProperty('SupportedAreas')) {
            const branch = await DB.Branch.findOne({
                where: {
                    id: req.params.id,
                },
            });
            await branch.setAreas(branchUpdates.SupportedAreas);
            isSupportedAreasUpdated = true;
        }
        // check if branch is updated
        if (numberOfAffectedRows || isWorkingHoursUpdated || isSupportedAreasUpdated) {
            res.status(200).json({
                message: "Branch was succesfully updated",
            }); c
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});

// delete branch by :id
router.delete("/:id", async (req, res) => {
    try {
        const branchDeleted = await DB.Branch.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (branchDeleted) {
            res.status(200).json({
                message: "Branch was succesfully deleted",
            });
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
});


export default router;