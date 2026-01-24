const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({ message: "access granted", user: req.user });
  
});
router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "admin access granted" });
});
module.exports = router;
