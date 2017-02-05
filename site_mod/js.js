var statya = require('./statya_sort');
var sock = require('./sock');

//обрпботка главной страницы списки стиатей
exports.js_info = function(req, res, next) {  var s = 'javascript'; statya.index_for(req,res,s); };
// выводим номера стартьи
exports.js_param = function (req, res, next) {
var s = 'javascript'; var ia = req.params.id3; statya.index_count(req,res,s,ia);
};
exports.js_link = function (req, res) {};
// другие списки статей (листалка)
exports.id_js = function (req, res, next) {
var s = 'javascript'; var i = req.params.id2; statya.index_ver(req,res,s,i);
}
exports.js_link1 = function (req, res) {};