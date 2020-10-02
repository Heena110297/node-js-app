const express = require('express');
const router = express.Router();
const passport = require('passport');
const cache = require ('../middlewares/cache');

const User = require('../models/user');

router.post('/register', async function (req, res, next) {
  const user = new User(req.body);
  await user.setHashedPassword();
  user.save((err, savedUser) => {
    if (err) {
      console.log('Error while creating a user: ', err);
    }
    res.json(savedUser);
  });
});

router.post('/login',
  passport.authenticate('local', {
    session: false
  }),
  function (req, res, next) {
    res.json(req.user.toAuthJson());
  });

  router.get('/', cache.handleJSONCache(),function(req,res,next){
    setTimeout(()=>
    res.json([{
      id:1,
      name:'John'
    },
  {
    id:2,
    name: 'peter'
  }]),5000)
  })
module.exports = router;


//router.use('/:userId',logData);
/* /* GET users listing. 
router.get('/', function(req, res, next) {
  res.send(req.query);
});

router.get('/download', function(req, res, next){
res.download('public/images/pic.png')
});
/* GET users listing. 
router.get('/:userId', function(req, res, next) {
  res.send({json: req.params.userId});
});

router.post('/',function(req, res, next){
  res.send({
    json: req.body
  });
});

function logData(req,res,next){
  var date= new Date();
  console.log(date)
  next();
} */