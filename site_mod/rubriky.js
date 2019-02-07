   var mysql = require('mysql');
    var conf = require('./info');
    var statya = require('./statya_sort');


 var sock = require('./sock');

exports.ind_param12 = function (req, res, next) {
res.cookie("page" , req.protocol + '://' + req.get('host') + req.originalUrl);
     var context = {};
      var db = mysql.createConnection({
  host: conf.info.host,
  user: conf.info.user,
  password: conf.info.password,
  database: conf.info.database
}); 

db.connect();

db.on('error', function(err) { if (err.code === 'PROTOCOL_CONNECTION_LOST')    db.connect();  });
  context.in_pas = 22;
  if((req.cookies.login != undefined)&&(req.cookies.pass != undefined)){
db.query("select * from `user` where `login`='"+req.cookies.login+"';", function(error, resultq, fields){
for (var key33 in resultq) {

        context.in_log = 24;
     if((resultq[key33].pass == req.cookies.pass)&&(req.cookies.login == resultq[key33].login)){

        context.in_pas = 24;
     }
}

 });
}

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

var tristo = parseInt(req.params.id22.replace(/<[^>]+>/g,'').replace(/\D+/g,""));

var tristo1 = parseInt(req.params.id23.replace(/<[^>]+>/g,'').replace(/\D+/g,""));

if(tristo1 == ""){
  context.tristo1 = 1;

}else{
context.tristo1 = tristo1; 
}
db.query("select * from `filed_under`;", function(error, result, fields){
 context.cat = '';
for (var key in result) {



          var icat1 = result[key].link;
          var icat = result[key].id;

if(tristo == icat){
  context.cat += '<div class="link_rub1"><a href="/rubriky'+icat+'/1"><b>'+icat1+'</b></a></div>';
}else{
                  context.cat += '<div class="link_rub"><a href="/rubriky'+icat+'/1"><b>'+icat1+'</b></a></div>';
                }
}

});

db.query("select count(id) from `articles` where `rubriky` = '"+tristo+"';", function(error, result, fields){

    if (error) { throw error; }else{
 
   context.col = Math.ceil(result[0]['count(id)']/5);
  var tesla = result[0]['count(id)'];

    if((!parseInt(tristo))||(tristo1 > context.col)||(parseInt(tristo) == "")){
    var test_id1 = Number(0);
    var test_id = Number(5);
    context.id =  1;
    }else{
      context.id =  tristo;
      var test_id = Number(context.tristo1)*5;
    var test_id1 = Number(test_id)-5;  
    }  

    db.query("SELECT * FROM `articles` where `rubriky` = '"+tristo+"'  ORDER BY `id` DESC LIMIT "+test_id1+","+test_id+";", function(error, result, fields){
    if (error) { throw error; }else{
                if((!result[0])||(parseInt(tesla) == "")){
           context.index = "";
 res.render('404');          
           
    
        }else{
         
context.index = "";

for (var key in result) {



          var i1 = result[key].mini;

          if(i1 == "no"){
            i1 = '<img src="../../include/2.jpeg" width="200">';
          }
          
          var i2 = result[key].date;
          var i3 = result[key].title;
          var i4 = result[key].prefix;
          var i5 = result[key].cat_info;
          var i6 = result[key].cat_name;
          var i7 = result[key].id;
          var i8 = result[key].category;


                  context.index += '<div class="div_one"> <div class="div_img">'+i1+'</div><div class="text_div1"><div class="up_div1"><div class="dates_div">'+i2+'</div><div class="div_title"><a href="/'+i8+i7+'">'+i3+'</a></div></div><div class="DIV_TEXT">'+i4+'</div><div class="up_div1"><div class="DIV_TEXT1"><div class="inv">'+i5+'</div>'+i6+'</div><div class="div_title1"><a href="/'+i8+i7+'">Читать далее</a></div></div></div></div>';

}

 res.render('rubriky', context);
      }
    }     
});


   next();
    }

});




}




exports.ind_link12 = function (req, res) {};
exports.ind_link13 = function (req, res) {};