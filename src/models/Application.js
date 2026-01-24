const mongoose = require("mongoose");
const app = require("../app");

const applicationschema = new mongoose.Schema({
    job:{
type :mongoose.Schema.Types.objectId ,
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
{timeStamps:true})
applicationschema.index({job:1 , candidate:1},{ unque:true})
