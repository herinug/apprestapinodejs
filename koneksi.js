var mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbrestapi',
    port:3307
});
conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql Terkoneksi');
});
module.exports = conn;

