const Job =require('../models/Job');
const Company = require('../models/Company');

//create job 
exports.createJob =async (req,res)=>{
    try{
        const {title , description ,location,skills,salary} = req.body ;
        const company = await Company.findOne({recruiter: req.user.userId});
        if(!company){
            return res.status(400).json({message:" recruite has no company profile"})
        }
        const job = await Job.create({
            company: company._id ,
            title,
            description,
            location,
            skills,
            salary
        })
        res.status(201).json({message:" job created successfully", job})

    }catch(error){
        res.status(500).json({message:  error.message})
    }
}

//list all jobs

exports.getJobs = async(req,res)=>{
    try{
        const jobs = await Jobs.find().populate('company ','name').sort({createdAt:-1});
        res.status(200).json({jobs})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
//get single job
exports.getJobById = async (req,res)=>{
    try{
        const job = await Job.finfById(req.params.id).populate('company ' ,'name') ;
        if(!job){
            return res.status(404).json({message:" job not found"})
        }
        res.status(200).json({job})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.updateJob = async (req,res)=>{
try{
    const job = await Job.findById(req.params.id).populate('company');
    if(!job){
        return res.status(404).json({message:" job not found"})
    }
    if(job.company,recruiter.toString() !== req.user.userId){
        return res.status(403).json({message:" not authorized to update this job"})
}
Object.assign(job,req,body);
await job.save();
res.json(job)
}catch(error){
    res.status(500).json({message: error.message})
}}

//delete job ;
exports.deleteJob = async (req,res)=>{
    try{
        const job = await Job.findOneById(req.params.id).populate('company');
        if(!job){
            return res.status(404).json({message:" job not found"})
        }
        if(job.company.recuriter.toString() !== req.user.userId){
            return res.status(403).json({message:" not authorized to delete this job"})
        }
        await job.deleteOne() ;
        res.json({message:" job deleted successfully"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}