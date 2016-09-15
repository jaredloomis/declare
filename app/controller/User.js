const Router = require("koa-router");

module.exports = function(app) {
    let router = new Router();

    // POST /User - Add User
    router.post("/User", function*() {
        try {
            this.body = yield this.context.models.user.create(this.request.body);
        } catch(ex) {
            this.body = ex;
        }
    });

    // GET /User - List Users
    router.get("/User", function*() {
        try {
            this.body = yield app.context.models.user.find({});
        } catch(ex) {
            this.body = ex;
        }
    });

    // GET /User/:id - Read User
    router.get("/User/:id", function*() {
        try {
            this.body = yield this.context.models.user.findOne(this.params.id);
        } catch(ex) {
            this.body = ex;
        }
    });

    return router;
};
