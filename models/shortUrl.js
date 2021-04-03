const mongoose = require('mongoose');


const shortUrlSchema = new mongoose.Schema({

        fullUrl : {type: String, required: true},
        shortCode : String,
        clicks: {type:Number, required: true, default: 0 },
        created_at: {type: Date, default: Date.now}    

})


module.exports = mongoose.model('ShortUrl',  shortUrlSchema);