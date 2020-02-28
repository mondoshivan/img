const IndexRouter = require('../routes/index');
const { Router } = require('express');

class APIRouterV1 extends Router {

    //-------------------------------
    static defaultOptions() {
        return {
            caseSensitive: true,
            strict: true
        }
    }

    //-------------------------------
    constructor(opts = APIRouterV1.defaultOptions()) {
        super(opts);
        this.get('/', (request, response) => {
            response.json({name: 'API', version: '1'})
        });
        this.get('/index', IndexRouter.getRoot);
        this.get('/index-page', IndexRouter.getRootPage);
    }
}

module.exports = APIRouterV1;