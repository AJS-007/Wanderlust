const mongoose=require("mongoose")
const Schema=mongoose.Schema;
// extracts the Schema class from Mongoose, which is used to define the structure of the documents inside a MongoDB collection.
const Review = require("./review.js")

const listingSchema=new Schema({
    title:{type:String,required:true,},
    description:String,
    image:{filename:String,
        url:{
            type:String,
         default:"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?_gl=1*qy9g3a*_ga*MTYzMjQyMDI3NS4xNzUwMzgzNjQ4*_ga_8JE65Q40S6*czE3NTAzODM2NDgkbzEkZzEkdDE3NTAzODM2NTEkajU3JGwwJGgw",       
        set:(v)=>v===""?"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?_gl=1*qy9g3a*_ga*MTYzMjQyMDI3NS4xNzUwMzgzNjQ4*_ga_8JE65Q40S6*czE3NTAzODM2NDgkbzEkZzEkdDE3NTAzODM2NTEkajU3JGwwJGgw":v,},},
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
     geometry: {
    type: {
      type: String, // e.g., "Point"
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },



})

listingSchema.post("findOneAndDelete",async(listing)=> {
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;
