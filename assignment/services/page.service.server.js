/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function (app, model) {
    /*var pages = [
        {_id: "321", name: "Post 1", wid: 456},
        {_id: "432", name: "Post 2", wid: 456},
        {_id: "543", name: "Post 3", wid: 456}
    ];*/
    app.post("/api/user/:uid/website/:wid/page", createPage);
    app.get("/api/user/:uid/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/user/:uid/website/:wid/page/:pid", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid", updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;

        model
            .pageModel
            .createPage(req.params.wid, req.body)
            .then(function (newPage) {
                res.json(newPage);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pid'];
        model
            .pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.send(status);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function deletePage(req, res) {
        var pageId = req.params['pid'];
        model
            .pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.send(status);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(req.params.wid)
            .then(function (pages) {

                res.json(pages)

            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findPageById(req, res) {

        var pageId = req.params.pid;
        model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                if (page) {
                    res.send(page);
                }
                else {
                    res.send('0');
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }
}