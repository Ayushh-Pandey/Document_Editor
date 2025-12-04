const mongoose = require('mongoose');
require('dotenv').config({path:'./backend.env'});


const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log('database connected successfully')
    } catch (error) {
        console.log('Error in connecting to database',error);
    }
}

module.exports = {connectDB}