const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongoDb Atlas (Cloud)
const mongURL= `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.jd0emgd.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = async ()=>{
    await mongoose.connect(mongURL);
    console.log("Connected To MongoDb successfully")
}

module.exports =connectToMongo;