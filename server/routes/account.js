const express = require('express')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.get('/:id',async (req,res)=>{
  try{
    const id = req.params.id;
    const user = await userModel.findById(id)
    res.json(user)
  } catch (e){
    console.log(e)
  }
})

router.post('/signup',async (req,res)=>{
  try {
    console.log(process.env.LOGIN_TOKEN_SECRETE)
    let newUser = new userModel(req.body)
    await newUser.save();

    const data = {account: req.body.account}
    const token = jwt.sign(data,process.env.LOGIN_TOKEN_SECRETE,{algorithm:'HS256', expiresIn:3600})

    res.status(200).json({id: newUser._id, username: newUser.username,idToken: token})
  }catch (e){
    console.log(e)
  }
})

router.post('/login', async (req,res)=>{
  try{
    let r = await userModel.findOne({account:req.body.account, password: req.body.password})
    if(!r){
      res.sendStatus(401)
    }
    const data = {account: req.body.account}
    const token = jwt.sign(data,process.env.LOGIN_TOKEN_SECRETE,{algorithm:'HS256', expiresIn:3600})
    res.status(200).json({id:r._id,username: r.username, idToken: token})

  } catch (e){
    console.log(e)
  }
})

module.exports = router
