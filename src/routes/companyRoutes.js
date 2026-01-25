const express = require('express');
const router = express.Router();

const {createCompany,getMyCompany} = require("../controllers/companyController")

const {protect} = require("../middleware/authMiddleware")
const {authorize} = require("../middleware/roleMiddleware")
router.post("/",protect,authorize("RECRUITER"),createCompany)
router.get("/me",protect,authorize("RECRUITER"),getMyCompany)


module.exports = router;