'use strict'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true },
  username: String,
  roles: [String],
  photos: [{url: String, isDefault: Boolean }],
  password: { type: String },
  avatar: String,
  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
