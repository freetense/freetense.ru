var conf = require('./info');
exports.socke = function (socket) {
socket.emit('config_add', '');

	socket.on('id_sort', function (data) {
		var re = new RegExp('http:\/\/' + conf.info.domen + '\/php','g');
   		var iphp = data.href.replace(re, "");
    if(Number.parseInt(iphp)){
    

  
        socket.join('php'+iphp);
        socket.broadcast.to('php'+iphp).emit('php_statya', 'комната'+iphp);
        
     }else{

     }

  });


}

exports.socke_count = function (socket) {
	socket.emit('config_add1', '');
	socket.on('count_sort', function (data) {
		var re1 = new RegExp('http:\/\/' + conf.info.domen + '\/count_','g');
	   	var i = data.count.replace(re1, "");

		var re2 = new RegExp('http:\/\/' + conf.info.domen + '\/php','g');
		var m = data.count.replace(re2, "");


if(m == ""){i = "1";}
    if((Number.parseInt(i))){
     
     }else{

     }
  });


}
