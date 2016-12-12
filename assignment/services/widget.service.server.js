/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function (app, model) {
    var widgets =
        [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<h1>Hello</h1>'},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    var tmpWidgets = [];

    /*var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../public/assignment/assignment3/views/widget/upload'});*/

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget", updateWidgetPosition);


    function updateWidgetPosition(req, res) {
        var start = req.query.start;
        var stop = req.query.stop;
        var pageId = req.params.pid;

        model
            .widgetModel
            .reOrderWidget(pageId, start, stop)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

        /*widgets.splice(stop, 0, widgets.splice(start, 1)[0]);
        res.send(widgets);
        console.log([start, stop]);*/
    }

    /*function uploadImage(req, res) {
        console.log("hello");
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        model
            .widgetModel
            .createWidget(pageId, myFile)
            .then(function (newWidget) {
                res.send(newWidget);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
        res.redirect(req.referrer);
    }*/

    function createWidget(req, res) {
        var widget = req.body;

        model
            .widgetModel
            .createWidget(req.params.pid, widget)
            .then(
                function (widget) {
                    console.log(widget);
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                widgets[wg].url = '/../assignment/uploads/' + filename;
                //res.send(widgets[wg]);
                break;
            }
        }
        for (var wg in tmpWidgets) {
            if (tmpWidgets[wg]._id == widgetId) {
                /*var toupdate = tmpWidgets[wg];
                 toupdate.url = '/../assignment/upload' + filename;
                 tmpWidgets = [];
                 tmpWidgets.push(toupdate)
                 console.log(tmpWidgets);
                 res.send(toupdate);*/
                tmpWidgets[wg].url = '/../assignment/uploads/'+filename;
                break;
            }
        }
        res.redirect("/assignment/#/user/" + userId +
            "/website/" + websiteId +
            "/page/" + pageId +
            "/widget/" + widgetId);
        //res.redirect(req.referrer);
    }

    function findWidgetsByPageId(req, res) {

        var pageId = req.params['pid'];
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                if (widgets) {
                    res.send(widgets);
                }

                else {
                    res.send('0');
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['wgid'];

        var pageId = req.params['pid'];//req.body._page;

        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                if (widget) {
                    res.send(widget);
                }
                else {
                    res.send('0');
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWidget(req, res) {
        var widgetId = req.params['wgid'];

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }
}
