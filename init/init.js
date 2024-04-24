const mongoose = require("mongoose");
const initdatas = require("./data.js");
const listing = require("../models/listing.js");
const url = 'mongodb://127.0.0.1:27017/wanderlust';

async function main(){
    await mongoose.connect(url);
}
main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function initdata(){
    await listing.deleteMany({});
   initdatas.data = initdatas.data.map((obj)=>({...obj,owner:"65f071328ea63bff0bdc5608"}));
    await listing.insertMany(initdatas.data);
    console.log("data was initialized");
}
initdata();