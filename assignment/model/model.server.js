/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var connectionString="mongodb://127.0.0.1:27017/wam-fall-2016";

    if(process.env.NODE_ENV == "prod") {
        connectionString = "mongodb://mrizwan:mrizwan~123@ds035806.mlab.com:35806/webdevdb";
    }

    mongoose.connect(connectionString);
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);
    return model;
};