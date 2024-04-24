const review = require("../models/reviews.js");
const listing = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    let listings = await listing.findById(req.params.id);
    let newreviews = new review(req.body.reviews);
    newreviews.author = req.user._id;
    console.log(newreviews);
    listings.reviews.push(newreviews);
    await newreviews.save(); 
    await listings.save(); 
    req.flash("success","New Review Created");
    res.redirect(`/listing/${listings._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewsId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewsId}});
    await review.findByIdAndDelete(reviewsId);
    req.flash("success","Review Deleted");
    res.redirect(`/listing/${id}`);
};
