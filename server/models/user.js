const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const userSchema = new Scheme({
  account:{
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true
  },
  username:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('user',userSchema,'users')
