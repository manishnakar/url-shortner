const express = require('express');
const router = express.Router();
const validUrl = require('valid-url')
const shortid = require('shortid')
const shortUrl = require('../models/shortUrl')


router.post('/shorten', async (req, res) => {

    //console.log(req.body);
   const {fullUrl } = req.body
   

   if( fullUrl &&  !validUrl.isUri(fullUrl)){
        res.status(401).json('Invalid input URL')
   }

   const shortCode = shortid.generate();

   try {
       const urlExists = await shortUrl.findOne({ fullUrl });
       if(urlExists){
            res.json(urlExists)
            //console.log('fullUrl exists')
       }else{            

            const newShortUrl = new shortUrl({
                fullUrl,
                shortCode               
            });

           await  newShortUrl.save();
           //console.log('new shortcode created')
           res.json(newShortUrl)           

       }
   } catch (error) {
       //console.log(error);
       res.status(500).json('Server Error')
   }

})

module.exports = router;