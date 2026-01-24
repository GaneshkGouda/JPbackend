const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,} ,
        recuiter:{
            type : mongoose.Schema.Types.ObjectId ,
            ref :"User",
            required:true
        }
},
{timeStamps:true})
module.exports = mongoose.model("Company" , companySchema);