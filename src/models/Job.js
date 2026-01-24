const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    title:{
        type:String,
        required:true,
     },
     description :String,
        location:String,
        skills:[String],
        salary:{
            type:Number,}
} ,
{timeStamps:true})
jobSchema.index({
    title:'text',
    location:'text',
})
module.exports = mongoose.model("Job" , jobSchema);