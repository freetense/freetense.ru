   var mysql = require('mysql');
    var conf = require('./info');
var md5 = require('md5');

 var sock = require('./sock');





exports.index_login1 = function(req, res, next) {
 //res.cookie("ids" , req.protocol + "://"+ req.get('Host') + req.url);
  //res.clearCookie('ids');
  var context = {};
  var x = req.cookies.ids;
  //console.log(x);
var user_id = req.body.username;
var token = req.body.password;
console.log(user_id);
context.in_log = 22;
context.in_pas = 22;
  if(user_id == undefined){
    context.in_log = 24;
  }

  if(token == undefined){
    context.in_pas = 24;
  }

   context.user_id = user_id;
context.password = token;




  // console.log(user_id + ' ' + token);
   var db = mysql.createConnection({
  host: conf.info.host,
  user: conf.info.user,
  password: conf.info.password,
  database: conf.info.database
}); 

db.connect();



db.on('error', function(err) { if (err.code === 'PROTOCOL_CONNECTION_LOST')    db.connect();  });
  if((req.cookies.login != undefined)&&(req.cookies.pass != undefined)){
db.query("select * from `user` where `login`='"+req.cookies.login+"';", function(error, resultq, fields){
for (var key33 in resultq) {

     if((resultq[key33].pass == req.cookies.pass)&&(req.cookies.login == resultq[key33].login)){
       res.redirect(req.protocol + '://' + req.get('host'));
     }
}

 });
}
db.query("select * from `user` where `login`='"+user_id+"';", function(error, result, fields){
for (var key in result) {

        context.in_log = 24;
     if(result[key].pass == md5(token)){

        context.in_pas = 24;
          res.cookie("login" , result[key].login);
          res.cookie("pass" , result[key].pass);
          if((req.cookies.page != undefined)&&(req.cookies.page != "")){
            res.redirect(req.cookies.page);
          }else{
            res.redirect(req.protocol + '://' + req.get('host'));
          }
          
     }
}

 });
db.query("select * from `articles` where `category`='avr' ORDER BY `id` DESC LIMIT 1;", function(error, result1, fields){
  

  if(!result1[0]){
context.title1 = "";
context.id1 = "";


  }else{
context.title1 = result1[0].title;
context.id1 = result1[0].id;

}


});

db.query("select * from `articles` where `category`='php' ORDER BY `id` DESC LIMIT 1;", function(error, result2, fields){
  if(!result2[0]){
context.title2 = "";
context.id2 = "";
  }else{
context.title2 = result2[0].title;
context.id2 = result2[0].id;
}


});

db.query("select * from `articles` where `category`='javascript' ORDER BY `id` DESC LIMIT 1;", function(error, result3, fields){


  if(!result3[0]){
context.title3 = "";
context.id3 = "";
  }else{
context.title3 = result3[0].title;
context.id3 = result3[0].id;
}


});

db.query("select * from `filed_under`;", function(error, result, fields){
 context.cat = '';
for (var key in result) {



          var icat1 = result[key].link;
          var icat = result[key].id;


                  context.cat += '<div class="link_rub"><a href="/rubriky'+icat+'/1"><b>'+icat1+'</b></a></div>';
}
 res.render('login', context);
});


 


    }






// другие списки статей (листалка)
exports.id_login = function (req, res, next) {
   var context = {};
      var db = mysql.createConnection({
  host: conf.info.host,
  user: conf.info.user,
  password: conf.info.password,
  database: conf.info.database
}); 

db.connect();

db.on('error', function(err) { if (err.code === 'PROTOCOL_CONNECTION_LOST')    db.connect();  });



db.query("select * from `articles` where `category`='avr' ORDER BY `id` DESC LIMIT 1;", function(error, result, fields){
  if(!result[0]){
context.title1 = "";
context.id1 = "";
  }else{
context.title1 = result[0].title;
context.id1 = result[0].id;
}


});

db.query("select * from `articles` where `category`='php' ORDER BY `id` DESC LIMIT 1;", function(error, result, fields){
  if(!result[0]){
context.title2 = "";
context.id2 = "";
  }else{
context.title2 = result[0].title;
context.id2 = result[0].id;
}


});

db.query("select * from `articles` where `category`='javascript' ORDER BY `id` DESC LIMIT 1;", function(error, result, fields){


  if(!result[0]){
context.title3 = "";
context.id3 = "";
  }else{
context.title3 = result[0].title;
context.id3 = result[0].id;
}


});

db.query("select * from `filed_under`;", function(error, result, fields){
 context.cat = '';
for (var key in result) {



          var icat1 = result[key].link;
          var icat = result[key].id;


                  context.cat += '<div class="link_rub"><a href="/rubriky'+icat+'/1"><b>'+icat1+'</b></a></div>';
}
 res.render('login', context);


});







}

exports.login_link1 = function (req, res) {};