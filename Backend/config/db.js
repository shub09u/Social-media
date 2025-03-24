const mongoose = require('mongoose');
require('dotenv').config()
const connecttodb= async()=>{

try {
 await mongoose.connect(process.env.MONGODBURL)
   console.log('Connected succesfully!');

    
} catch (error) {
    console.log(({msg:"error in connecting mongodb",error:error.message}));
    
}


}


module.exports = connecttodb