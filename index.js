'use strict'

import express from 'express'
import connectDB from './config/db'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { rateLimiter } from './middlewares'

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  exposedHeaders: ['x-access-token'],
  optionsSuccessStatus: 200
}

if (process.env.CORS_ORIGIN === '*') {
  delete corsOptions.origin
}

app.use(morgan('tiny'))


app.use(cors(corsOptions))
app.use(helmet({
  hsts: false
}))
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}))

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    styleSrc: ['\'self\'', '\'unsafe-inline\''],
    scriptSrc: ['\'self\'', '\'unsafe-inline\'']
  }
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// setup view
app.set('view engine', 'ejs')
app.use(express.static('public'))
// imoplement rate limitor on create shortlink API
app.use('/api/url/shorten', rateLimiter)

// connecting to db
connectDB()

// Health Check API
app.get('/health-check', (req, res, next) => {
  res.status(200).json('ok')
})

// Define Routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/shortUrl'))

app.use('*', (req, res, next) => {
  const error = {
    statusCode: 404,
    message: ['Cannot', req.method, req.originalUrl].join(' ')
  }
  next(error)
})

app.use((error, req, res, next) => {
  if (!error) {
    return
  }

  const isParseError = error instanceof SyntaxError && error.status === 400
  if (isParseError) {
    return res.status(400).json('Invalid JSON body')
  }

  if (error.statusCode) {
    if (error.statusCode === 404) {
      return res.status(404).send('File not found')
    }
    return res.status(error.statusCode).json(error)
  }

  // console.log('[Error]', error)
  return res.status(500).json(error)
})

const port = process.env.PORT || 5001

app.listen(port, () => {
  // console.log(`server listening on port ${port}`)
})
