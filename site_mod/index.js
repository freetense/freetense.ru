   var mysql = require('mysql');
    var conf = require('./info');
    var statya = require('./statya_sort');



 var sock = require('./sock');






//обрпботка главной страницы списки стиатей
exports.index_info = function(req, res, next) {
 // res.cookie("ids" , 'cookie_value');
  //res.clearCookie('ids');
  //var x = req.cookies.ids;
 // console.log(x);

   var context = {};
   var db = mysql.createConnection({
  host: conf.info.host,
  user: conf.info.user,
  password: conf.info.password,
  database: conf.info.database
}); 
db.connect();
db.on('error', function(err) { if (err.code === 'PROTOCOL_CONNECTION_LOST')    db.connect();  });

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

});

db.query("select count(id) from `articles`;", function(error, result, fields){
    if (error) { throw error; }else{
var tristo = "1".replace(/<[^>]+>/g,'').replace(/\D+/g,""); 
    context.id = tristo;
     context.col =  Math.ceil(result[0]['count(id)']/5)};
  var tesla = result[0]['count(id)'];
    var test_id = Number(tristo)*5;
    if(tristo == 1){
    var test_id1 = Number(0);
    }else{
    var test_id1 = Number(test_id)-5;  
    }  

    db.query("SELECT * FROM `articles`  ORDER BY `id` DESC LIMIT "+test_id1+","+test_id+";", function(error, result, fields){
    if (error) { throw error; }else{
        if((!result[0])||(parseInt(tesla) == "")){
           context.index = "";
 res.render('404');

        }else{


         
context.index = "";

for (var key in result) {


          var i1 = result[key].mini;

          if(i1 == "no"){
            i1 = '<img src="include/2.jpeg" width="200">';
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
 res.render('index', context);
db.destroy(); 
      }
    }
    
});

    

});


    };






// другие списки статей (листалка)
exports.ind_param1 = function (req, res, next) {
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

});

db.query("select count(id) from `articles`;", function(error, result, fields){
    if (error) { throw error; }else{
var tristo = req.params.id20.replace(/<[^>]+>/g,'').replace(/\D+/g,""); 
   context.col = Math.ceil(result[0]['count(id)']/5);
  var tesla = result[0]['count(id)'];

    if((tristo == 1)||(!parseInt(tristo))){
    var test_id1 = Number(0);
    var test_id = Number(5);
    context.id =  1;
    }else{
      context.id =  tristo;
      var test_id = Number(context.col)*5;
    var test_id1 = Number(test_id)-5;  
    }  

    db.query("SELECT * FROM `articles`  ORDER BY `id` DESC LIMIT "+test_id1+","+test_id+";", function(error, result, fields){
    if (error) { throw error; }else{
                if((!result[0])||(parseInt(tesla) == "")){
           context.index = "";
 res.render('404');          
           
    
        }else{
         
context.index = "";

for (var key in result) {



          var i1 = result[key].mini;

          if(i1 == "no"){
            i1 = '<img src="include/2.jpeg" width="200">';
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

 res.render('index', context);

       }
    }
     
});


   next();
    }

});

}
exports.ind_link1 = function (req, res) {};