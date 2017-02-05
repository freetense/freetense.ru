var statya = require('./statya_sort');
var sock = require('./sock');


//обрпботка главной страницы списки стиатей
exports.avr_info = function(req, res, next) { var s = 'avr'; statya.index_for(req,res,s); };
// выводим номера стартьи
exports.avr_param = function (req, res, next) { var s = 'avr'; var ia = req.params.id9; statya.index_count(req,res,s,ia); };
exports.avr_link = function (req, res) {};
// другие списки статей (листалка)
exports.id_avr = function (req, res, next) { var s = 'avr'; var i = req.params.id8; statya.index_ver(req,res,s,i); }
exports.avr_link1 = function (req, res) {};