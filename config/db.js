const mongoose = require('mongoose');
const colors = require('colors');

// function mongodb database connection
const connectdb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan);
    }
    catch(error){
        console.log("DB Error", error);
    }
}
module.exports = connectdb;
