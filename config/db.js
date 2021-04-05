'use strict'

import mongoose from 'mongoose'

const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // console.log('Mongodb connected')
  } catch (error) {
    // console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
