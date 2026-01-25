const Application = require("../models/Application");
const Job =require('../models/Job');

exports.applyJob= async(req,res)=>{
    try{
        const jobId = request.params.id ;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message:" job not found"})
        }
        const application = Application.create({
            job : jobId,
            candidate :req.user.userId,

        })
        res.status(201).json({message:" applied successfully", application})
    }catch(error){  
        if(error.code === 11000){
            return res.status(400).json({message:" you have already applied to this job"})
        }
        res.status(500).json({message: error.message})}
}


exports.getMyApplication = async (req,res)=>{
    try{
        const application = await Application.find({candidate:req.user.userId}).populate('job');
        res.status(200).json({application})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
//get teh applications for a job ( recruiter)
exports.getApplicationsForJob = async (req,res)=>{
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({message:" job not found"})
            if(job.company.recruiter.toString()!== req.userId){
                return res.status(403).json({message:" not authorized to view applications for this job"})
            }
            const applications = await Application.find({job:jobId}).populate('candidate','name email')
            res.json({applications})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
 // update application status

 exports.updateApplicationStatus =async (req,res)=>{
   try {const status = req.body ;
    const application = await Application.findById(req.params.id).populate({
        path :'job',
        populate:{
            path :'company'
        }
    })
if(!application){
res.status(404).json({message:" application not found"})
}
if(application.job.company.recruiter.toString() !== req.user.userId){
    return res.status(403).json({message:" not authorized to update this application"})
}
application.status = status ;
await application.save();
res.json({message:" application status updated", application})


 }
    catch(error){   
        res.status(500).json({message: error.message})
    }
}