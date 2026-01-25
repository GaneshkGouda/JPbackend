require("dotenv").config()
const app = require("./app");
const connectDB = require("./config/db");
const {connectRedis} = require("./config/redis");

const PORT = process.env.PORT || 5000;

connectDB();
connectRedis();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})