/**
 * Created by Rizwan Mohamed on 11/7/2016.
 */
module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../assignment/upload'});
    app.post("/api/example/upload", upload.single('myFile'), uploadImage);
    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        res.send(myFile);
    }
}