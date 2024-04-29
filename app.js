if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const url = 'mongodb://127.0.0.1:27017/wanderlust';
const dbURL = process.env.ATLASDB_URL;
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const Localstrategy = require("passport-local");
const {isLoggedIn, isOwner,validateListing,validateBooking} = require("./middleware.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const filterRouter = require("./routes/filter.js");
const listing = require('./models/listing.js');
const booking = require('./models/booking.js');
const userbooking = require('./models/user.js');
const WrapAsync = require('./utils/WrapAsync.js');
const user = require('./models/user.js');
const { error, Console } = require('console');

async function main(){
    await mongoose.connect(dbURL);
}

main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(console.log(err));
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24* 3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



app.get("/bookings/:id", WrapAsync(async(req,res)=>{
    let {id} = req.params;
    const userBook = await userbooking.findById(id).populate({path:"bookings",populate:{path:"author",},});
    res.render("listing/book.ejs",{userBook});
}))

app.post("/listing/:id/booking",isLoggedIn,validateBooking,WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let user = await userbooking.findById(id).populate("bookings");
    let bookingss = new booking(req.body.booking);

    if(bookingss.checkin > bookingss.checkout){
        throw new ExpressError(400,"please choose the correct checkin date");
    }
    bookingss.author = req.user._id;
    user.bookings.push(bookingss);
    

    for(let i=user.bookings.length-1; i>=0; i--){
        for(let j=0; j<i; j++){
            if(user.bookings[j].listing == user.bookings[i].listing){
                // throw new ExpressError(400, "You already book this listing");
                req.flash("error","You already book this listing");
                return res.redirect(`/bookings/${id}`);
            }
        }
    }
    await bookingss.save();
    await user.save();
    // console.log(user.bookings);
    // console.log(bookingss);
    // res.send("done");
    res.redirect(`/bookings/${id}`);
    
}))
app.delete("/listing/:id/booking/:bookId",isLoggedIn,WrapAsync(async(req,res)=>{
    let {id,bookId} = req.params;
    await userbooking.findByIdAndUpdate(id,{$pull:{bookings:bookId}});
    await booking.findByIdAndDelete(bookId);
    req.flash("success","Booking cancel");
    res.redirect(`/bookings/${id}`);
}))

app.use("/listing",listingsRouter);
app.use("/listing/:id/reviews",reviewsRouter);
app.use("/",userRouter);
app.use("/filter",filterRouter);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
    let{status = 500,message="Something Went Wrong"} = err;
    res.status(status).render("listing/error.ejs",{message});
})
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})


