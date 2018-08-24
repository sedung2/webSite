'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dbConn = require('./dbConn');

dbConn.connect();

exports.setup = function () {
  
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });
  
  passport.use(new LocalStrategy({
        usernameField: 'loginID',
        passwordField: 'loginPassword',
        session: true, // 세션에 저장 여부
        passReqToCallback: false
      },
      function(id, password, done) {
      // 인증 정보 체크 로직
        dbConn.query('SELECT * FROM tb_member WHERE id = ? and password = ? and access = 1', [loginID, loginPassword], function(err, results, fields) {
          console.log(results[0]);
          if(results[0]){
            return done(null, id);
          } else {
            dbConn.query('SELECT * FROM tb_member WHERE id = ? and access = 0', [loginID], function(err, results, fields) {
              if(results[0]){
                return done(null, false, { message: '접근 권한이 없습니다. 관리자에게 문의하세요.' })
              } else {
                return done(null, false, { message: '아이디 or 비밀번호가 틀렸습니다.' })
              }
            });
          } 
        });
      }
  ));
};