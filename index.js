const express = require('express');
const connectDB = require ('./config/db')

const app = express();

//connecting to db
connectDB();

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/shortUrl'));

const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

