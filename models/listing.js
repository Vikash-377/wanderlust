const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./reviews.js");
const { string, number } = require("joi");

const listingschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    category: {
        type: String,
        enum: [
            "rooms", "iconic", "farms", "mountains", 
            "castles", "desert", "camping", 
            "arctic", "beach", "boats"
        ],
    },
    geometry:{
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
          },
    
          coordinates: {
            type: [Number],
            required: true
          },
    },
    
    
});

listingschema.post("findOneAndDelete", async (listings) => {
    if (listings) {
        await review.deleteMany({ _id: { $in: listings.reviews } });
    }
});
const listing = mongoose.model("listing", listingschema);
module.exports = listing;