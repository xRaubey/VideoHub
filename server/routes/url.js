const express = require('express')
const router = express.Router()
const urlExists = require('url-exists');


// const exist = require('url-exist')


router.get('/',(req,res)=>{
  urlExists('https://www.google.com', function(err, exists) {
    // console.log(exists); // true
    res.send(exists)
  });
})


router.post('/',(req,res)=>{
  let url = req.body.url;
  // console.log(url)

  urlExists(url, function(err, exists) {
    // console.log(exists); // true
    res.send(exists)
  });
})


module.exports = router
