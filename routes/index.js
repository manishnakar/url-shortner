const express = require('express');
const router = express.Router();
const shortUrl = require('../models/shortUrl');


router.get('/', (req, res) => {
    
    res.render('index', {baseUrl: process.env.BASE_URL});
})

router.get('/:code', async (req, res)=> {

    try {
        
        const url = await shortUrl.findOne({shortCode : req.params.code})

        if(url){
            url.clicks = url.clicks + 1;
            url.save();
            res.redirect(url.fullUrl);
            //console.log('redirected to ' + url.fullUrl)
        }
        else{
            res.status(404).send('Url not found');
        }

    } catch (error) {
        //console.error(error)
        res.status(500).send('Server Error')
    }
})


module.exports = router;