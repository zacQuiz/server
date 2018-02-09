const User = require('../models/User')
const Score = require('../models/Score')
var FB = require('fb'),
    fb = new FB.Facebook({
        version : 'v2.8'
    });
const accesTokenAvailable = (req,res,next)=>{
     FB.setAccessToken(req.headers.accesstoken)
     next()
}
const afterLogin = (req,res)=>{
   
        FB.api('/me', {
            fields:['name','email','picture']
        },'GET',function(response){
            res.send(response)
            User.find({email:response.email})
             .then(doc=>{
                 if(doc.length !== 0){
                    res.status(200).json({user:doc})
                 }else{
                     let user = new User({
                         name : response.name,
                         email: response.email,
                         photoProfile: response.picture.data.url
                     })
                     user.save()
                      .then(userSaved=>{res.statu(200).json({user:userSaved})})
                      .catch(err=>{res.send(err)})
                 }
             }).catch(err=>{res.send(err)})
        })
}

const CreateUser = (req,res)=>{
    let objCreate = {
        name    : req.body.name,
        email   : req.body.email,
        photoProfile : req.body.photoProfile
    }
    User.find({email:req.body.email})
     .then(docUser=>{
         if(docUser.length !== 0){
             res.redirect(`/users/profile/${docUser[0]._id}`)
         }else{
             User.create(objCreate)
                 .then(result => { res.status(200).send({ message: 'created user: ', result }) })
                 .catch(err => { res.status(500).send(err) })
         }
     })
     .catch(err=>{res.send(err)})
}

const myprofile = (req,res)=>{
    User.find({_id:req.params.id})
     .then(doc=>{res.status(200).send({message:'welcome to your profile',data:doc})})
     .catch(err=>{res.send(err)})
}

const addScoreToDatabase = (req,res)=>{
    
    let objScore = {
        userId  : req.headers.userid,
        level : req.body.level,
        score : req.body.score
    }
    Score.create(objScore)
     .then(result=>{
        res.status(200).send({message:'score generated',result})
     })
     .catch(err=>{res.send(err)})
}

const deleteScore = (req,res)=>{
    Score.find({userId:req.params.id})
     .populate('userId')
     .then(docScore=>{
         Score.remove({ _id: req.params.scoreId })
          .then(result=>{res.status(200).send({message:'score has been deleted',data:docScore})})
          .catch(err=>{res.send(err)})
     })
     .catch(err=>{res.status(500).send(err)})
    
     
}

const findMyScore = (req,res)=>{
    Score.find({userId:req.params.id})
     .populate('userId')
     .then(docs=>{
         res.send(docs)
     })
     .catch(err=>{res.send(err)})
}

module.exports = {
    CreateUser,addScoreToDatabase,deleteScore,findMyScore,myprofile,afterLogin,accesTokenAvailable
}