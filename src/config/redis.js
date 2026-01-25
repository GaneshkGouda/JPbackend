const {createClient}= require('redis');
const redisClient = createClient({
    socket:{
        host: process.env.REDIS_HOST,
        port:Number(process.env.REDIS_PORT),
        tls: {}, 
    },
    password:process.env.REDIS_PASSWORD
})
redisClient.on('connect',()=>{
    console.log('Redis client connecting...');
})
redisClient.on('ready',()=>{
    console.log('Redis client connected');

})
redisClient.on('error',(err)=>{
    console.log('Redis Client Error', err);
}   )
const connectRedis = async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect();
    }
}
module.exports = {redisClient,connectRedis}