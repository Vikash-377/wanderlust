const listing = require("../models/listing.js");

module.exports.search = async(req,res)=>{
    let{destination} = req.query;
    const listings = await listing.find();
    const alllisting = listings.filter((listings)=> listings.country==destination || listings.location==destination);
    if(alllisting.length){
        res.render("listing/home.ejs",{alllisting});   
    }
    else{
        req.flash("error","Not Found!!");
        res.redirect("/listing");
    }
}

module.exports.room = async(req,res)=>{
        let {rooms} = req.query;
        const filListing = await listing.find({});
        let alllisting = filListing.filter((filListing)=> filListing.category==rooms);
        res.render("listing/home.ejs",{alllisting});
    };

module.exports.iconic = async(req,res)=>{
    let {iconic} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==iconic);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.farm = async(req,res)=>{
    let {farms} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==farms);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.mountains = async(req,res)=>{
    let {mountains} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==mountains);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.castles = async(req,res)=>{
    let {castles} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==castles);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.beach = async(req,res)=>{
    let {beach} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==beach);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.camping = async(req,res)=>{
    let {camping} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==camping);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.arctic = async(req,res)=>{
    let {arctic} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==arctic);
    res.render("listing/home.ejs",{alllisting});
}

module.exports.desert = async(req,res)=>{
    let {desert} = req.query;
    const filListing = await listing.find({});
    let alllisting = filListing.filter((filListing)=> filListing.category==desert);
    res.render("listing/home.ejs",{alllisting});
}

