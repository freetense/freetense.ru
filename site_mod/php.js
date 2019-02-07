var statya = require('./statya_sort');
var sock = require('./sock');



//обрпботка главной страницы списки стиатей
exports.index_info = function(req, res, next) {  var s = 'php'; statya.index_for(req,res,s); };
// выводим номера стартьи
exports.id_param1 = function (req, res, next) { 
  var s = 'php'; var ia = req.params.id1; statya.index_ver(req,res,s,ia)
};
exports.id_link = function (req, res) {
};
// другие списки статей (листалка)
exports.id_param = function (req, res, next) { 
 var s = 'php'; var i = req.params.id; statya.index_count(req,res,s,i); ; 
}
exports.id_link1 = function (req, res) {
};