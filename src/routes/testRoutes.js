const express = require('express');
const router = express.Router();
const {protct} = require("../middleware/authMiddleware");
const {authorize} = require("../middleware/roleMiddleware");

router.get("/profile",protct,(req,res)=>{
    res.json({message:"access granted",
        user :req.user
    })
}) 
router.get("/admin",protct,authorize("ADMIN"),(req,res)=>{
    res.json({message:"admin access granted",})
})
module.exports = router;