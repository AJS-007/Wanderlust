const cloudinary = require('cloudinary').v2;
const{CloudinaryStorage} = require('multer-storage-cloudinary')
//config krna mtlb kisi ko kisi se jorna

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'Wanderlust_DEV',
        allowedFormats:["png","jpg","jpeg"]
        
    }
})

module.exports={
    cloudinary,
    storage,
}