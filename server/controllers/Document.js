const Document = require('../model/Document');

require('dotenv').config();

const cloudinary = require('cloudinary').v2;


async function uploadDoc(req, res) {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_UPLOAD_CLOUNDNAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
    const options = {
        display_name:`${Date.now()} - ${req.file.originalname}`,
        folder: 'Document_editor',
        use_filename: true,
        filename_override:`${Date.now()}-${req.file.originalname}`,
        unique_filename:true,
        overwrite: false,
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path,options);

        // const newDoc = new Document({
        //     _id:req.params.id,
        //     data:result.secure_url
        // })
        // await newDoc.save();

        res.status(200).json({message:'Document uploaded successfully',data:result.secure_url});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Error in uploading document'});
    }
    
}

module.exports = {uploadDoc}