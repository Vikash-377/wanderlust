const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const booking = require("./booking");

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
    },

    bookings:[
        {
            type: Schema.Types.ObjectId,
            ref:"booking",
        },
    ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);