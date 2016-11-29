/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findPagesForWebsite: findPagesForWebsite,
        setModel: setModel

    }
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec();
    }

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function (WebsiteObj) {
                model
                    .userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(WebsiteObj);
                        userObj.save();
                        return userObj;
                    })
            })

    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById({_id: websiteId});
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({
            _id: websiteId
        }, {
            name: website.name,
            description: website.description
        })
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId})
    }
}