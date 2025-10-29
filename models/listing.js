const mongoose=require("mongoose")
const Schema=mongoose.Schema;
// extracts the Schema class from Mongoose, which is used to define the structure of the documents inside a MongoDB collection.
const Review = require("./review.js")

const listingSchema=new Schema({
    title:{type:String,required:true,},
    description:String,
    image:{
        url: String,
        fileName: String,
    },
    location:String,
    country:String,
    price:Number,
    reviews:[
        {type:Schema.Types.ObjectId,
        ref:"Review",},
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
  //    geometry: {
  //   type: {
  //     type: String, // e.g., "Point"
  //     enum: ['Point'],
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number], // [longitude, latitude]
  //     required: true
  //   }
  // },



})

listingSchema.post("findOneAndDelete",async(listing)=> {
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;
