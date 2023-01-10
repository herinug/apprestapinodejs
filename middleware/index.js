var express = require ('express');
var auth = require ('./auth');
// const verifikasi = require('./verifikasi');
var router = express.Router();
var verifikasi = require('./verifikasi');


// menu registrasi
router.post('/api/vi/register', auth.registrasi);
router.post('/api/vi/login', auth.login);
// alamat yang perlu otorisasi
router.get('/api/vi/rahasia', verifikasi(), auth.halamanrahasia);
module.exports= router;