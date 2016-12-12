/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel
    }
    return api;
    function setModel(_model) {
        model = _model;
    }

    function findAllWebsitesForUser(userId) {

        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();

    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        var user = UserModel.findById(userId);

        return user;
    }

    function updateUser(userId, user) {
        return UserModel.update(
            {
                _id: userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName
            })
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        })
    }

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }
};