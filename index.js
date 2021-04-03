const express = require('express');

const app = express();

app.use(express.json({extended: false}));


app.get('/', (req, res)=> {

    res.send('hello world ')
})

app.get('/api/:shortUrl', (req, res) => {
    res.send(' redirect to full url ')
})

app.post('/api/url', (req, res) => {

    res.json({ message: 'short url created '});
})


const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

