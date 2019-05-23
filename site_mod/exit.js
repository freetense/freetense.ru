   var mysql = require('mysql');
    var conf = require('./info');
var md5 = require('md5');

 var sock = require('./sock');





exports.index_exit = function(req, res, next) {



          res.cookie("login" , "");
          res.cookie("pass" , "");
          if((req.cookies.page != undefined)&&(req.cookies.page != "")){
            res.redirect(req.cookies.page);
          }else{
            res.redirect(req.protocol + '://' + req.get('host'));
          }
          



    }









exports.login_link1 = function (req, res) {};