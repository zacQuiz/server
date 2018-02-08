const User = require('../models/User')
const Score = require('../models/Score')

const CreateUser = (req,res)=>{
    let objCreate = {
        name    : req.body.name,
        email   : req.body.email
    }
    User.find({email:req.body.email})
     .then(docUser=>{
        //  console.log(docUser)
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
        userId  : req.body.userId,
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
    Score.find({_id:req.params.id})
     .then(docScore=>{
         Score.remove({ _id: req.params.id })
          .then(result=>{res.status(200).send({message:'deleted score',data:docScore})})
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
    CreateUser,addScoreToDatabase,deleteScore,findMyScore,myprofile
}