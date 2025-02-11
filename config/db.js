const mongoose = require("mongoose");

const connectDB = async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`db connected ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log("mongo connect error");
        
    }
}

module.exports = connectDB;