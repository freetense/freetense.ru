var statya = require('./statya_sort');
var sock = require('./sock');



//обрпботка главной страницы списки стиатей
exports.info_info = function(req, res, next) { var s = 'info'; statya.index_for(req,res,s); };
// выводим номера стартьи
exports.info_param = function (req, res, next) {
var s = 'info'; var ia = req.params.id7; statya.index_count(req,res,s,ia);
};
exports.info_link = function (req, res) {};
// другие списки статей (листалка)
exports.id_info = function (req, res, next) {
var s = 'info'; var i = req.params.id6; statya.index_ver(req,res,s,i);
}
exports.info_link1 = function (req, res) {};