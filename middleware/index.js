var express = require ('express');
var auth = require ('./auth');
var router = express.Router();

router.post('/api/vi/register', auth.registrasi);
router.post('/api/vi/login', auth.login);
module.exports= router;