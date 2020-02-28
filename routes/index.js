const IndexModel = require('../model/index_model');

class IndexRouter {

    //-------------------------------
    static getRoot(request, response) {
        IndexModel.getModel((error, result) => {
            if (!error && result) {
                response.send(result);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }

    //-------------------------------
    static getRootPage(request, response) {
        response.render('index', { title: 'New Express'});
    }
}

module.exports = IndexRouter;