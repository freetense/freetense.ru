   var mysql = require('mysql');
    var conf = require('./info');
var md5 = require('md5');

 var sock = require('./sock');





exports.index_login12 = function(req, res, next) {
// res.cookie("ids" , req.protocol + "://"+ req.get('Host') + req.url);
  //res.clearCookie('ids');
  var x = req.cookies.ids;
 // console.log(x);
var name = req.body.aname;
var fname = req.body.fname;
var emails = req.body.emails;
var phone = req.body.phone;
var user_id = req.body.username;
var passsow = req.body.passsow;
var pass = req.body.pass;
var into = req.body.into;

var s = 25; 

  console.log(name + ' ' + fname + ' ' + emails + ' ' + phone + ' ' + user_id + ' ' + passsow + ' ' + pass);




   var context = {};
   context.aname = name;
    context.into = into;
context.fname = fname;

var e = "";
var r = /^\w+@\w+\.\w{2,4}$/i;
if ((!r.test(emails))&&(emails != undefined)) {
e = 24;
}else{

e = 22;
}
context.emails = emails;
context.emails1 = e;



var re = /^\d[\d\(\)\ -]{4,14}\d$/;
if ((!re.test(phone))&&(phone != undefined)) {
e = 24;
}else{
e = 22;
   s = 2;
}
context.phone = phone;
context.phone1 = e;




context.user_id = user_id;
context.passsow = passsow;
context.pass = pass;

if (passsow != pass) {
e = 24;
}else{
e = 22;
}
context.pass1 = e;


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
db.query("select * from `user` where `login`='"+user_id+"';", function(error, result1, fields){
 if(!result1[0]){
   context.user2 = 21;
 }else{
  context.user2 = 20;
}
if(user_id == undefined){
context.user2 = 21;
}

});
if(phone == undefined){
  context.phone2 = 21;
  }else{
db.query("select * from `user` where `phone`='"+phone.replace(/[\s\-\(\)]+/g, '')+"';", function(error, result2, fields){
 if(!result2[0]){
   context.phone2 = 21;
 }else{
  context.phone2 = 20;
}



});
}


db.query("select * from `user` where `email`='"+emails+"';", function(error, result3, fields){
 if(!result3[0]){
   context.emails2 = 21;
 }else{
  context.emails2 = 20;
}
if(emails == undefined){
context.emails2 = 21;
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



if ((context.aname == "")||(context.fname == "")) { 
          s = 2;
} 
  if((context.emails1 == 24)||(context.emails == "")){              
          s = 2;
  }else{
    if(context.emails2 != 21){
      //console.log(1);
          s = 2;
    }

  }
if (context.phone == "") {
          s = 2;
}else{
    if(context.phone2 != 21){
     // console.log(2);
          s = 2;
    }
}
if (context.user_id == "") {
          s = 2;
}else{
    if(context.user2 != 21){
      //console.log(3);
             s = 2;
    }
}
if ((context.pass == "")&&(context.passsow == "")) { 
        s = 2;
}
if((context.pass1 == 24)){ 
         s = 2;
}
 console.log(s);
//var passr = randomString(20);
          if((s != 2)){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
           // alert();
           if(context.pass != undefined){
            var pass4 = md5(context.pass);
           //console.log("fgdg");


  for (var i = 0; i < 14; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}
            db.query("INSERT INTO user (aname, fname, phone, email, login, pass, podp, info_pass, id_user, auth, edit_pass) VALUES ('"+context.aname+"','"+context.fname+"','"+context.phone+"','"+context.emails+"','"+context.user_id+"','"+pass4+"','','"+text+"',1,0,'0')");
          } 
 res.render('registration', context);
});

}













exports.login_link = function (req, res) {};