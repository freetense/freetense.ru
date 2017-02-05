var statya = require('./statya_sort');
var sock = require('./sock');



//обрпботка главной страницы списки стиатей
exports.java_info = function(req, res, next) { var s = 'java'; statya.index_for(req,res,s); };
// выводим номера стартьи
exports.java_param = function (req, res, next) {
  var s = 'java'; var ia = req.params.id11; statya.index_count(req,res,s,ia);
};
exports.java_link = function (req, res) {};
// другие списки статей (листалка)
exports.id_java = function (req, res, next) {
 var s = 'java'; var i = req.params.id10; statya.index_ver(req,res,s,i);
}
exports.java_link1 = function (req, res) {};