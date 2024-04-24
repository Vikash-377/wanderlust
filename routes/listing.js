const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const storage = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,WrapAsync(listingController.createListing));

// New route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(WrapAsync(listingController.showListing)) 
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,WrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,WrapAsync(listingController.destroyListing)); 


//  Edit route
 router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.renderEditForm));
 

 module.exports = router;
 