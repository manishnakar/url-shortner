const express = require('express');
const connectDB = require ('./config/db')

const app = express();

//connecting to db
connectDB();

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/shortUrl'));

const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

