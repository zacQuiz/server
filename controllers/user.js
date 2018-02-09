const User = require('../models/User')
const Score = require('../models/Score')
var FB = require('fb'),
    fb = new FB.Facebook({
        version : 'v2.8'
    });
const accesTokenAvailable = (req,res,next)=>{
    console.log(req.headers.accesstoken,'ini acctoken middleware')
     FB.setAccessToken(req.headers.accesstoken)
    //  console.log(req.headers.accesstoken,'ini acctoken middleware')
    // //  console.log(FB.setAccessToken(req.headers.accesstoken),'middle ware')
     next()
}
const afterLogin = (req,res)=>{
   
        FB.api('/me', {
            fields:['name','email','picture','age_range']
        },'GET',function(response){
            // res.send(response)
            User.find({email:response.email})
             .then(doc=>{
                 if(doc.length !== 0){
                     console.log(doc,'ini di after login')
                    res.status(200).json({user:doc})
                 }else{
                     let user = new User({
                         name : response.name,
                         email: response.email,
                         photoProfile: response.picture.data.url
                     })
                     user.save()
                      .then(userSaved=>{res.status(200).json({user:userSaved})})
                      .catch(err=>{res.send(err)})
                 }
             }).catch(err=>{res.send(err)})
        })
}

const CreateUser = (req,res)=>{
//     console.log('masuk')
//     console.log(req.headers)
//     let objCreate = {
//         name    : req.body.name,
//         email   : req.body.email,
//         photoProfile : req.body.photoProfile
//     }
//     console.log(objCreate,'ini create')
//     User.find({email:req.body.email})
//      .then(docUser=>{
//          if(docUser.length !== 0){
//              res.redirect(`/users/profile/${docUser[0]._id}`)
//          }else{
//              User.create(objCreate)
//                  .then(result => { res.status(200).send({ message: 'created user: ', result }) })
//                  .catch(err => { res.status(500).send(err) })
//          }
//      })
//      .catch(err=>{res.send(err)})
}

const myprofile = (req,res)=>{
    User.find({_id:req.params.id})
     .then(doc=>{res.status(200).send({message:'welcome to your profile',data:doc})})
     .catch(err=>{res.send(err)})
}

const addScoreToDatabase = (req,res)=>{
    console.log(req.body,'ini give up')
    let objScore = {
        userId  : req.body.userId,
        score : req.body.score
    }
    console.log(objScore,'ini obj score')
    Score.create(objScore)
     .then(result=>{
         console.log('keluar result harusnya',result)
        res.status(200).send({message:'score generated',result})
     })
     .catch(err=>{
         console.log(err,'ini error')
         res.send(err)}
        )
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
    console.log(req.params.id,'ini find my score')
    Score.find()
     .populate('userId')
     .then(docs=>{

         res.send(docs)
     })
     .catch(err=>{res.send(err)})
}

module.exports = {
    CreateUser,addScoreToDatabase,deleteScore,findMyScore,myprofile,afterLogin,accesTokenAvailable
}