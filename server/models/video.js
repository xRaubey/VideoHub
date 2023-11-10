
const mongoose = require('mongoose')
const videoTypeSchema = require('./videoTypes').schema

const Schema = mongoose.Schema

const videoSchema = new Schema({
  title:{
    type: String,
    require: true
  },
  url:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true
  },
  userId:{
    type: String,
    require: true
  },
  video_type:videoTypeSchema,
})

module.exports = mongoose.model('video',videoSchema, 'videos')
