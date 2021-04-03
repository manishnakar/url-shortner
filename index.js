const express = require('express');
const connectDB = require ('./db')

const app = express();

//connecting to db
connectDB();

app.use(express.json({extended: false}));


const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

