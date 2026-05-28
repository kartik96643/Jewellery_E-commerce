const mongoose = require('mongoose');
require('dotenv').config()

async function connectToMongo() {
    

    try{

         mongoose.connect(process.env.MONGO_CONNECTION)
    }
    catch{
        process.exit(1);
    }
    }

module.exports = {connectToMongo,}