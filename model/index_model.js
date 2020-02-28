const MyDb = require('../components/db');


class IndexModel {

    //-------------------------------
    static getModel(callback) {
        let db_handler = new MyDb('img');
        db_handler.find('CONTACT', {}, function(error, result) {
            callback(error, result);
        });
    }
}

module.exports = IndexModel;