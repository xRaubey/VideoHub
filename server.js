const express = require('express')
const path = require('path')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
require('dotenv').config({path:'./.env'})


const api = require('./server/routes/api')
const url = require('./server/routes/url')
const account = require('./server/routes/account')

const port = 3000
const app = express()

const db = "mongodb://localhost:27017/videoLib"


// Middleware


mongoose.connect(db).then(
  ()=>{
    console.log('connected')
    app.listen(port,'127.0.0.1', function(){
      console.log("Server running at:"+port)
    })
  },
  (err)=>{
    console.log(err)
  }
)

app.use(express.json())

app.use(express.static(path.join(__dirname, 'dist/meanstack')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api', api);
app.use('/url', url);
app.use('/account', account)

// app.get("*", (req, res)=>{
//   res.sendFile(path.join(__dirname, 'dist/meanstack/index.html'))
// })

app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/meanstack/index.html'))
})

