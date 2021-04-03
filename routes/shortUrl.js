const express = require('express');
const router = express.Router();


const shortUrl = require('../models/shortUrl')


router.get('/api/:shortUrl', (req, res) => {
    res.send(' redirect to full url ')
})

router.post('/shorten', (req, res) => {

   

    res.json({ message: 'short url created '});
})


module.exports = router;