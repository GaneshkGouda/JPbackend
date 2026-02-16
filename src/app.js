const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes')
const applicationRouts = require('./routes/applicationRoutes');
const app = express();
const bullBoard = require('./config/bullBoard');
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies',companyRoutes)
app.use('/api/applications',applicationRouts);
app.use("/abmin/queues", bullBoard.getRouter());


app.get("/health",(req,res)=>{
    res.status(200).json({status : "OK" , message :"server is running" })
})
 module.exports = app ;
