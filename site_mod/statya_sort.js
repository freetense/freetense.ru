  var mysql = require('mysql');
    var conf = require('./info');
   var  mysqlUtilities = require('mysql-utilities');

exports.index_login = function (req, res,contexts) {
  res.cookie('login' , contexts);

}

exports.index_count = function (req, res,contexts,ia) {

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
context.title11 = "";
context.id11 = "";
  }else{
context.title11 = result1[0].title;
context.id11 = result1[0].id;
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
db.query("select * from `filed_under`;", function(error, result, fields){
 context.cat = '';
for (var key in result) {



          var icat1 = result[key].link;
          var icat = result[key].id;


                  context.cat += '<div class="link_rub"><a href="/rubriky'+icat+'/1"><b>'+icat1+'</b></a></div>';
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




var tristo = ia.replace(/<[^>]+>/g,'').replace(/\D+/g,""); 
if(tristo == ""){
         res.render(contexts+'_staty', context);
}else{ 

//вывод статьи
db.query("select * from `articles` where `id`="+parseInt(tristo)+" AND `category`='"+contexts+"' ;", function(error, result, fields){
    if (error) { throw error; }else{
        if(!result[0]){
           res.render('404');
          
           db.end();
           
        }else{
           context.title = result[0].title;
           context.id = result[0].id;
           context.date = result[0].date;






var retur =  result[0].text;


context.text = statya_id(retur);



//следующая статья
db.query("SELECT * FROM `articles` WHERE `id` > "+parseInt(tristo)+" AND `category`='"+contexts+"'   ORDER BY `id` LIMIT 1;", function(error, result, fields){
    if (error) { throw error; }else{
        if(!result[0]){
           context.nexts = "";
        }else{
           context.nexts = '<a href="/'+contexts+result[0].id+'">следующая</a>';
        }
    }
       
});


//предыдущая статья
db.query("SELECT * FROM `articles` WHERE `id` < "+parseInt(tristo)+" AND `category`='"+contexts+"'  ORDER BY `id` DESC LIMIT 1;", function(error, result, fields){
    if (error) { throw error; }else{
        if(!result[0]){
           context.preper = "";
        }else{
           context.preper = '<a href="/'+contexts+result[0].id+'">предыдущая</a>';
        }








        //ОСНОВАНЕ ДЛЯ ШАБЛОНА

      

}

res.render(contexts+'_staty', context);
db.destroy();

});



}
}


});
}

     //  console.log("Статья номер ", req.params.id);
       //удаление html тегов
       //var result = str.replace(/<[^>]+>/g,'');

}




















exports.index_ver = function (req, res,contexts,i) {



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

db.query("select count(id) from `articles` where `category`='"+contexts+"' ;", function(error, result, fields){
    if (error) { throw error; }else{
var tristo = i.replace(/<[^>]+>/g,'').replace(/\D+/g,""); 
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

    db.query("SELECT * FROM `articles` WHERE `category`='"+contexts+"'  ORDER BY `id` DESC LIMIT "+test_id1+","+test_id+";", function(error, result, fields){
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


                  context.index += '<div class="div_one"> <div class="div_img">'+i1+'</div><div class="text_div1"><div class="up_div1"><div class="dates_div">'+i2+'</div><div class="div_title"><a href="/'+contexts+i7+'">'+i3+'</a></div></div><div class="DIV_TEXT">'+i4+'</div><div class="up_div1"><div class="DIV_TEXT1"><div class="inv">'+i5+'</div>'+i6+'</div><div class="div_title1"><a href="/'+contexts+i7+'">Читать далее</a></div></div></div></div>';

}

 res.render(contexts, context);
      }
    } 
});



    }

});




}



































exports.index_for = function (req, res,contexts) {
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


db.query("select count(id) from `articles` where `category`='"+contexts+"' ;", function(error, result, fields){
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

    db.query("SELECT * FROM `articles` WHERE `category`='"+contexts+"'  ORDER BY `id` DESC LIMIT "+test_id1+","+test_id+";", function(error, result, fields){
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


                  context.index += '<div class="div_one"> <div class="div_img">'+i1+'</div><div class="text_div1"><div class="up_div1"><div class="dates_div">'+i2+'</div><div class="div_title"><a href="/'+contexts+i7+'">'+i3+'</a></div></div><div class="DIV_TEXT">'+i4+'</div><div class="up_div1"><div class="DIV_TEXT1"><div class="inv">'+i5+'</div>'+i6+'</div><div class="div_title1"><a href="/'+contexts+i7+'">Читать далее</a></div></div></div></div>';

}

res.render(contexts, context);
db.destroy();
      }
    }
    
});

    

});
}


function statya_id(retur) {

  var pos5 = new Array();

var m = 0;
pos = retur.indexOf(":link:");
while ( pos != -1 ) {
var s = 0;
pos5[m] = new Array();


  var pos2s = retur.indexOf("|",pos+6);
  var pos1 = retur.substring(pos+6,pos2s);

  var pos3s = retur.indexOf(":/link:",pos2s);
  var pos3 = retur.substring(pos2s+1,pos3s);
      pos5[m][s] = retur.substring(pos,pos3s+7);
  pos5[m][++s] = pos1;
  pos5[m][++s] = pos3;
   var pos = retur.indexOf(":link:",pos+8);
m++;



}

for(var d = 0;d<= pos5.length-1;d++){

var infor = '<a href="'+pos5[d][1]+'" >'+pos5[d][2]+'</a>';
retur = retur.replace(pos5[d][0],infor);
}

var pos4 = new Array();

var m = 0;
pos = retur.indexOf(":file:");
while ( pos != -1 ) {
var s = 0;
pos4[m] = new Array();


  var pos2s = retur.indexOf("|",pos+6);
  var pos1 = retur.substring(pos+6,pos2s);

  var pos3s = retur.indexOf(":/file:",pos2s);
  var pos3 = retur.substring(pos2s+1,pos3s);
      pos4[m][s] = retur.substring(pos,pos3s+7);
  pos4[m][++s] = pos1;
  pos4[m][++s] = pos3;
   var pos = retur.indexOf(":file:",pos+8);
m++;





}
for(var d = 0;d<= pos4.length-1;d++){

var infor = '<a href="'+pos4[d][1]+'" >'+pos4[d][2]+'</a>';
retur = retur.replace(pos4[d][0],infor);
}

var pos4 = new Array();

var m = 0;
pos = retur.indexOf(":imge:");
while ( pos != -1 ) {
var s = 0;
pos4[m] = new Array();


  var pos2s = retur.indexOf(":/imge:",pos+6);
  var pos1 = retur.substring(pos+6,pos2s);

  var pos3s = retur.indexOf(":/imge:",pos2s);
  var pos3 = retur.substring(pos2s+1,pos3s);
    pos4[m][s] = retur.substring(pos,pos3s+7);
  pos4[m][++s] = pos1;
  pos4[m][++s] = pos3;
   var pos = retur.indexOf(":imge:",pos+8);

m++;



}
for(var d = 0;d<= pos4.length-1;d++){

var infor = '<br><br><div class="img_linr" ><img src="'+pos4[d][1]+'" width=700></div><br>';
retur = retur.replace(pos4[d][0],infor);
}

var pos4 = new Array();

var m = 0;

pos = retur.indexOf(":cods:");
while ( pos != -1 ) {
var s = 0;
pos4[m] = new Array();

  var pos2s = retur.indexOf("|",pos+6);
  var pos1 = retur.substring(pos+6,pos2s);

  var pos3s = retur.indexOf(":/cods:",pos2s);
  var pos3 = retur.substring(pos2s+1,pos3s);
  pos4[m][s] = retur.substring(pos,pos3s+7);
  pos4[m][++s] = pos1;
  pos4[m][++s] = pos3;
   var pos = retur.indexOf(":cods:",pos+8);


m++;


}

for(var d = 0;d<= pos4.length-1;d++){

var infor = '<br><br><pre><code data-language="'+pos4[d][1]+'">'+pos4[d][2]+'</code></pre><br><br>';
retur = retur.replace(pos4[d][0],infor);
}

            var i = retur.replace(/:br:/g,"<br>").replace(/:i:/g,"<i>").replace(/:\/i:/g,"</i>").replace(/:b:/g,"<b>").replace(/:\/b:/g,"</b>");
return i;
}