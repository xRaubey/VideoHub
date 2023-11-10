const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const typeSchema = new Schema({
  topic:{
    type:String
  }
})

module.exports = mongoose.model('videoType', typeSchema, 'videoTypes')
