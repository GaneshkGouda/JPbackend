const mongoose = require("mongoose");
const app = require("../app");

const applicationschema = new mongoose.Schema({
    job:{
type: mongoose.Schema.Types.ObjectId,
ref: "Job",
required:true
    } ,
    candidate:{
        type : mongoose.Schema.Types.ObjectId ,
        ref :"User",    
        required:true},
        
        status:{
            type:String,
            enum :['APPLIED','REJECTED','SHORTLISTED','HIRED'],
            default:'APPLIED'
        }

}
,
{timestamps:true})
applicationschema.index({job:1 , candidate:1},{  unique: true })
module.exports = mongoose.model("Application" , applicationschema);
