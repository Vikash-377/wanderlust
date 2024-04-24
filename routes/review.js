const express = require("express");
const router = express.Router({mergeParams:true});
const listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../models/reviews.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Reviews
//Post route
router.post("/",isLoggedIn,validateReview,WrapAsync(reviewController.createReview));

//Delete review route

router.delete("/:reviewsId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.destroyReview));

module.exports = router;
