var express = require('express');
var cookieParser = require('cookie-parser');  
var bodyParser = require("body-parser");
 
var app = express();
 
// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});
 

app.use(cookieParser());
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var url = require('url');
var reconnect = require('reconnect-net');
 var ejs = require('ejs');
// подключение шаблонов страниц ejs
 var index_ = require('./site_mod/index');
 var sock = require('./site_mod/sock');
 var conf = require('./site_mod/info');

 var colors = require('colors');
var url = require('url');
var path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


//главная страница
app.get('/', index_.index_info);
app.param('id20', index_.ind_param1);
app.get('/counts_:id20', index_.ind_link1);
///////////////////////////////////


//поиск
 var search1 = require('./site_mod/search'); 
app.param('id30', search1.ind_params1);
app.get('/search=:id30', function (req, res) 
{ });

 app.get('/search=', search1.ind_params1);

//рубрики
 var index_r = require('./site_mod/rubriky'); 

app.param('id22',          index_r.ind_param12);
app.param('id23',          index_r.ind_param12);
 app.get('/rubriky:id22', index_r.ind_link13);
app.get('/rubriky:id22/:id23', index_r.ind_link12);
/////

//php
 var index_php = require('./site_mod/php'); 
 app.get('/php', index_php.index_info);

app.param('id1', index_php.id_param1); app.get('/phpcount_:id1', index_php.id_link1);

app.param('id', index_php.id_param); app.get('/php:id', index_php.id_link);


//js
 var index_js = require('./site_mod/js'); 
 app.get('/javascript', index_js.js_info);

app.param('id2', index_js.id_js); app.get('/jscount_:id2', index_js.js_link1);

app.param('id3', index_js.js_param); app.get('/javascript:id3', index_js.js_link);

//nodejs
 var index_node = require('./site_mod/nodejs'); 
 app.get('/nodejs', index_node.node_info);

app.param('id4', index_node.id_node); app.get('/nodejs_count_:id4', index_node.node_link1);

app.param('id5', index_node.node_param); app.get('/nodejs:id5', index_node.node_link);



//info
 var index_infor = require('./site_mod/infor'); 
 app.get('/info', index_infor.info_info);

app.param('id6', index_infor.id_info); app.get('/info_count_:id6', index_infor.info_link1);

app.param('id7', index_infor.info_param); app.get('/info:id7', index_infor.info_link);

//avr
 var index_avr = require('./site_mod/avr'); 
 app.get('/avr', index_avr.avr_info);

app.param('id8', index_avr.id_avr); app.get('/avr_count_:id8', index_avr.avr_link1);

app.param('id9', index_avr.avr_param); app.get('/avr:id9', index_avr.avr_link);


//java
 var index_java = require('./site_mod/java'); 
 app.get('/java', index_java.java_info);

app.param('id10', index_java.id_java); app.get('/java_count_:id10', index_java.java_link1);

app.param('id11', index_java.java_param); app.get('/java:id11', index_java.java_link);

//login
 var index_login = require('./site_mod/login');
app.all('/login', urlencodedParser, index_login.index_login1);

 var index_registration = require('./site_mod/registration');
app.all('/registration', urlencodedParser, index_registration.index_login12);


io.on('connection', sock.socke);
io.on('connection', sock.socke_count);

///////////////////////////////////










//Обработка ошибок неправильного адреса
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
app.get('/error', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
 
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  res.render('404');
});
/////////////////////////////////////









server.listen(conf.info.ports, conf.info.domen,
	function(err) {
    if(err){ 
                    throw err;

    }
	},
	function() {
    var data = new Date();
		console.log('Сервер '.red, conf.info.domen.grey, ' запущен на '.red, conf.info.ports.grey, ' порту...'.red, data);
	});

reconnect(function (stream) {
 var data = new Date();  
// console.log('Сервер '.red, conf.info.domen.grey, ' перезагружен на '.red, conf.info.ports.grey, ' порту...'.red, data);
}).connect(conf.info.ports, conf.info.domen,  function(err) {
if(err) throw err;
},
function() {

});
