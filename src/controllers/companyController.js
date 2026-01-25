const Company = require("../models/Company")
exports.createCompany = async (req,res)=>{
    try{
        const{name}= req.body
        const exCompany = await Company.findOne({ recruiter :req.user.userId})
        if(exCompany){
            return res.status(400).json({message :'company already exits'})
        }
        const company = await Company.create({
            name ,
            recruiter :req.user.userId
        })
        res.status(201).json(company)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.getMyCompany = async (req,res)=>{
    try {
        const company = Company.findOne({recruiter : req.user.userId})
        if(!company){
            res.status(404).json({message:"company not found"})
        }
        res.json(company)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};