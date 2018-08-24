var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'nodejs-003.cafe24.com',
  user     : 'lsj4653',
  password : 'Tpwns2004',
  port     : 3306,
  database : 'lsj4653'
});

module.exports = connection;