var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
var joi = require('joi');


exports.registrasi = function (req,res){
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var role= req.body.role

    var scheme = joi.object({
        username:joi.string().min(3).required(),
        password : joi.string().min(3).required(),
        email: joi.string().email().required(),
        role : joi.string().min(1).required()
       
    });
    var {error} = scheme.validate(req.body)
    if (error) return res.status(401).send({auth:false,message:'username dan password minimal 3 huruf'});
    var post = {
        username: username,
        email: email,
        password:md5(password),
        role: role,
        tanggal_daftar: new Date()
    }
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user","email",post.email];
    query = mysql.format(query, table);
    connection.query(query,post,function(error, rows){
        if (error){
            console.log(error);
        } else{
        if(rows.length == 0){
            var query = "INSERT INTO ?? SET ?";
            var table =["user"];
            query = mysql.format(query,table);
            connection.query(query, post,function(error,rows){
                if (error){
                    console.log(error);
                }else{
                    response.ok("berhasil menambahkan data",res);
                }
            });
           } else {
            response.ok("email sudah terdaftar",res);
           }
        }
    });
}

// control login
exports.login = function (req,res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user","password",md5(post.password),"email",post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if (rows.length == 1 ){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id;
                var data = {
                    id_user : id_user,
                    acces_token : token,
                    ip_address : ip.address()
                }
                var query = "INSERT INTO ?? SET ?"
                var table = ["akses_token"];
                query = mysql.format(query,table);
                connection.query(query,data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                         res.json({
                            success: true,
                            message: ' Token JWT Tergenerte',
                            token:token,
                            currUser:data.id_user
                         });
                    }
                });
             }else{
                res.json({"error": true,"mesage": "Email Paswoord salah"});
             }
        }
    });
}

exports.halamanrahasia = function(req,res){
    response.ok("halaman ini hanya untuk user dengan role = 2",res);
}

