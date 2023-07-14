const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required :true,
        unique :true
    },
    password:{
        type: String ,
        required :true,
        minLength :5
    },
    booking:[{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }]
})

module.exports =mongoose.model('User',userSchema);