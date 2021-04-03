const express = require('express');

const app = express();



app.get('/', (req, res)=> {

    res.send('hello world ')
})


const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

