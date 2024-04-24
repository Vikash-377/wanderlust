const { object } = require("joi");
const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{
    const alllisting =  await listing.find({});
     res.render("listing/home.ejs",{alllisting});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listing/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let{id} = req.params;
    const listings = await listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!listings){
       req.flash("error","Listing you requested for does not exist!");
       res.redirect("/listing");
    }
   
    res.render("listing/show.ejs",{listings});
}

module.exports.createListing = async(req,res,next)=>{
   let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send() 
    const url = req.file.path;
    const filename = req.file.filename;

    // const file = req.files['listing[gallery]'];
    // let files = file.map((el)=>{
    //     return el.path;
    // })
    
    // let list = Object.assign({}, files);
    //    const convertedObjects = Object.keys(list).map(key => {
    //     return { urls: list[key] };
    //   });
      
    // let urls = convertedObjects;

    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry = response.body.features[0].geometry;
    await newlisting.save();
    console.log(newlisting);
    
    req.flash("success","New Listing Created!");
    res.redirect("/listing");
};


module.exports.renderEditForm =async(req,res)=>{
    let{id} = req.params;
    const listingid = await listing.findById(id);
    if(!listingid){
       req.flash("error","Listing you requested for does not exist!");
       res.redirect("/listing");
    }
    let originalImageUrl = listingid.image.url;
    originalImageUrl  = originalImageUrl.replace("/upload","/upload/h_100,w_200");
    res.render("listing/edit.ejs",{listingid ,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let{id} = req.params;
    let listings = await listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listings.image = {url,filename};
        await listings.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);    
};

module.exports.destroyListing = async(req,res)=>{
    let{id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listing");
};