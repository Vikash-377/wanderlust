const joi = require('joi');
const listing = require('./models/listing');
 module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("",null),
        category:joi.string().required(),
        
    }).required(),
 });

 module.exports.reviewSchema = joi.object({
    reviews: joi.object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(), 
    }).required(),
 });

 module.exports.bookingSchema = joi.object({
   booking: joi.object({
      listing: joi.string().allow(),
      icon: joi.string().allow(),
      titles: joi.string().allow(),
      price: joi.number().allow(),
      checkin: joi.string().required(),
      checkout: joi.string().required(),
      guest: joi.number().required(),
      username: joi.string().required(),
      phoneno: joi.number().required(),
   }).required(), 
 });