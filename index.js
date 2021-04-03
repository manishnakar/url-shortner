const express = require('express');
const connectDB = require ('./config/db')
const helmet = require('helmet');

const app = express();

//connecting to db
connectDB();


const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    exposedHeaders: ['x-access-token'],
    optionsSuccessStatus: 200
  }

if (process.env.CORS_ORIGIN === '*') {
delete corsOptions.origin
}
  
app.use(cors(corsOptions))
app.use(helmet());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


//setup view
app.set('view engine', 'ejs');

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/shortUrl'));

const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})

