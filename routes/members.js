var express = require('express');
var router = express.Router();
var dbConn = require('./dbConn');
var passport = require('passport');
var fs = require('fs');

// 패스포트 세팅
require('./passport').setup();
  
/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  var userInfo={
    id:req.body.id,
    password:req.body.password,
    name:req.body.name,
    email:req.body.email
  };
  
  var query = dbConn.query('INSERT INTO tb_member set ?', userInfo,
  
    function (error, results, fields) {
      if (error);
      // Neat!
      else res.redirect('login');
    });
    
    console.log(query.sql);
    
    res.redirect('login#wrapper-signup');
});

router.get('/login', function(req, res, next){
  res.render('member/login');
});

// 인증 실패 시 401 리턴, {} -> 인증 스트레티지
router.post('/login', function(req, res, next){
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    // 인증된 유저 정보로 응답
    res.redirect('/index');
  })(req, res, next);
});

module.exports = router;
