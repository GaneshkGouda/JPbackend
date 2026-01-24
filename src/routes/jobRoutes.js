const express = require('express');
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", getJobs);
router.get("/:id", getJobById);

router.post("/", protect, authorize("RECRUITER"), createJob);
router.put("/:id", protect, authorize("RECRUITER"), updateJob);
router.delete("/:id", protect, authorize("RECRUITER"), deleteJob);

module.exports = router;