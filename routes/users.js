var express = require('express');
var router = express.Router();
var userRouter = require('../controllers/user')

router.post('/',userRouter.accesTokenAvailable,userRouter.afterLogin)
router.post('/score',userRouter.accesTokenAvailable,userRouter.addScoreToDatabase) //score
router.delete('/:id/score/:scoreId',userRouter.accesTokenAvailable,userRouter.deleteScore)
router.get('/scores/:id',userRouter.accesTokenAvailable,userRouter.findMyScore)
router.get('/profile/:id',userRouter.accesTokenAvailable,userRouter.myprofile)
// router.get('/',userRouter.accesTokenAvailable,userRouter.afterLogin)

module.exports = router;
