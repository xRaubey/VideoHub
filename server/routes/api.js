const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()



const VideoModel = require('../models/video')
const VideoTypeModel = require('../models/videoTypes')
const UserModel = require('../models/user')
const jwt = require("jsonwebtoken");



// mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).then((err)=>{
//   if(err){console.log(err)}
//   else{console.log("Connected to MongoDB")}
// })

function tokenMiddleware(req,res,next){

  let headers = req.headers.authorization;
  // console.log(headers)
  let token = headers.split(' ')[1];
  if(!token){
    res.sendStatus(401);
  }

  jwt.verify(token,process.env.LOGIN_TOKEN_SECRETE,(err,account)=>{
    if(err){
      // console.log(err)
      res.sendStatus(403)
    }
    req.account = account
    next()
  })

}



router.get('/',tokenMiddleware,(req,res)=>{

  res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

  res.send('<h1>api</h1>')
})

router.get('/videos',tokenMiddleware,async (req,res)=>{
  try{

    let r = await VideoModel.find();
    // console.log(r)
    // res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

    res.json(r)
  } catch (error){
    console.log(error)
  }

})

router.get('/videos/:topic/:uid',tokenMiddleware,async (req,res)=>{
  try{
    let topic = req.params.topic
    let uid  = req.params.uid
    let r = await VideoModel.find({'video_type.topic': topic, userId:uid});
    // res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });
    res.json(r)
  } catch (error){
    console.log(error)
  }

})

router.post('/videos',tokenMiddleware,async (req,res)=>{


  console.log(`topic = ${req.body.current}`)
  try{
    let newVideo = new VideoModel({title:req.body.title, url:req.body.url, description:req.body.description,
      userId: req.body.userId,
      video_type:new VideoTypeModel({topic: req.body.current})}
    )
    //console.log(newVideo)
    await newVideo.save()
    // await VideoModel.create(req.body);

    let updated = await VideoModel.find(
      {'video_type.topic': req.body.current, 'userId':req.body.userId}
      //{video_type: new VideoTypeModel({topic: req.body.current})}
      // {
      //   video_type: {
      //     $elemMatch: {
      //       topic: req.body.current
      //     }
      //   }
      // },
      // {
      //   "video_type.$": 1
      // }
    )
    //console.log(updated)
    // res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

    res.json(updated)
  }catch (e){
    // console.log('error')
    console.log(e)
  }

})

router.patch('/video/:id', tokenMiddleware,async (req,res)=>{
  try{
    let id = req.params.id;
    let field = req.body.field.toLocaleLowerCase();
    let value = req.body.value;
    // console.log(`field = ${field} value = ${value}`)
    let data = {};
    data[field] = value
    let patchResult = await VideoModel.findByIdAndUpdate(id,data,{new: true})
    // console.log(patchResult)
    res.json(patchResult)
  }catch (e){
    console.log(e)
  }
})

router.delete('/video',tokenMiddleware,async (req,res)=>{
  try{
    let uid = req.body.uid
    let topic = req.body.topic

    await VideoModel.findByIdAndDelete(req.body._id)
    let updated = await VideoModel.find({'userId':uid, 'video_type.topic': topic})
    // res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });
    res.json(updated)
  } catch (e){
    throw Error(e)
  }
})


// Get all video types
router.get('/video-types',tokenMiddleware, async (req,res)=>{
  try{
    let docs = await VideoTypeModel.find();
    //console.log(docs)
    res.json(docs)
  } catch (e){
    console.log(e)
  }

})

router.get('/amount/:id', tokenMiddleware, async (req,res)=>{
  try{
    let id = req.params.id;
    let allUserVideo = await VideoModel.aggregate([
      {
        $match: {userId:id}
      },
      {
        $group: {
          // _id: '$_id',
          _id: '$video_type.topic',
          num:{$sum:1}
        }
      },
      {
        $sort: {
          _id:1
        }
      }
    ])

    //console.log(allUserVideo)
    res.json(allUserVideo)

  }catch (e) {
    console.log(e)
  }
})


module.exports = router
