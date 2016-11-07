/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function (app) {
    var pages = [
        {_id: "321", name: "Post 1", wid: 456},
        {_id: "432", name: "Post 2", wid: 456},
        {_id: "543", name: "Post 3", wid: 456}
    ];
    app.post("/api/user/:uid/website/:wid/page", createPage);
    app.get("/api/user/:uid/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/user/:uid/website/:wid/page/:pid", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid", updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pid'];
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = page.name;
            }
        }
        res.sendStatus(200);
    }

    function deletePage(req, res) {
        var pageId = req.params['pid'];
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = parseInt(req.params.wid);
        var pagesToReturn = [];
        for (var p in pages) {
            if (parseInt(pages[p].wid) === websiteId) {
                pagesToReturn.push(pages[p]);
            }
        }
        res.send(pagesToReturn);
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;

        for (var p in pages) {
            if (pages[p]._id == pageId) {
                res.send(pages[p]);
                return;
            }
        }
    }
};