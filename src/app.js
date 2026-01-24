const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

app.get("/health",(req,res)=>{
    res.send(200).json({status : "OK" , message :"server is running" })
})
 module.exports = app ;
