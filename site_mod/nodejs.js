var statya = require('./statya_sort');
var sock = require('./sock');


//обрпботка главной страницы списки стиатей
exports.node_info = function(req, res, next) { var s = 'nodejs'; statya.index_for(req,res,s);  };
// выводим номера стартьи
exports.node_param = function (req, res, next) {
var s = 'nodejs'; var ia = req.params.id5; statya.index_count(req,res,s,ia);
}
exports.node_link = function (req, res) {};
// другие списки статей (листалка)
exports.id_node = function (req, res, next) {
var s = 'nodejs'; var i = req.params.id4; statya.index_ver(req,res,s,i);
}
exports.node_link1 = function (req, res) {};