'use strict';
var response = require('./res');
var connection = require('./koneksi');

export.index = function(req,res){
    response.ok("Aplikasi REST API Berjalan")
};