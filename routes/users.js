var express = require('express');
var router = express.Router();
var userRouter = require('../controllers/user')

router.post('/',userRouter.CreateUser)
router.post('/score',userRouter.addScoreToDatabase) //score
router.delete('/score/:id',userRouter.deleteScore)
router.get('/scores/:id',userRouter.findMyScore)
router.get('/profile/:id',userRouter.myprofile)

module.exports = router;
