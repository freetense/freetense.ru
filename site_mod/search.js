   var mysql = require('mysql');
    var conf = require('./info');
    var statya = require('./statya_sort');


 var sock = require('./sock');

exports.ind_params1 = function (req, res, next) {
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


    
 


    db.query("select * from `articles` where concat(title,text,prefix)  like '%"+req.params.id30+"%';", function(error, result, fields){
    if (error) { throw error; }else{
     
                if((!result[0])){
           context.index = "<br><br><br><br><br><br><br><center><h1>По вашему запросу ничего не найдено!</h1></center>";         
           

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


      }
res.render('search', context);
    }
      
});





}
