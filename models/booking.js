const { types, ref } = require("joi");
const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
   listing:{
    type:String,
   },
    icon:{
    type:String,
   },
   titles:{
    type:String,
   },
   price:{
    type:Number,
   },
    checkin:{
        type:String,
    },
    checkout:{
        type:String,
    },
    guest:{
        type:Number,
    },
    username:{
        type:String,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    phoneno:{
        type:Number,
    },
});

module.exports = mongoose.model("booking",bookingSchema);