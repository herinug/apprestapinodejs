'use strict';
 
module.exports = function(app){
    var jsonku = require ('./controller');
    
    app.route('/')
        .get(jsonku.index);
    app.route('/tampilmahasiswa')
        .get(jsonku.getallmahasiswa);
    app.route('/tampilmahasiswa/:id')
        .get(jsonku.getallmahasiswaid);
    app.route('/tambahmahasiswa')
        .post(jsonku.tambahMahasiswa);
    app.route('/ubahmahasiswa')
        .put(jsonku.ubahMahasiswa);
    app.route('/Deletemahasiswa')
        .put(jsonku.hapusMahasiswa);
}
