const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register user
exports.register = async (req, res)=>{
    try{

        const {name,email,password,role} = req.body;

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const user = User.create({
            name,email,password:hashedpassword,role
        }) ;
        res.status(201).json({message : "User registered successfully"})
    } catch (error){
        res.status(500).json({message :error.message})
    }
}

//login user
exports.login = async(req ,res)=>{
    try{
        const {email,password} =req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message : "Invalid  credentials"})  
        }
        const ismatch= await bcrypt.compare(password , user.password)
        if(!ismatch){
            return res.status(401).json({message : "Invalid  credentials"})
        }
        const tocken = jwt.sign({ userId : user._id , role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        ) ;
        res.status(200).json({tocken})


    }catch(error){
        res.status(500).json({message :error.message})
    }
}