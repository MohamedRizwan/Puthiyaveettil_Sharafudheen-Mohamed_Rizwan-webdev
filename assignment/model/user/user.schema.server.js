/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        // dateCreated: {type: new Date(), default: Date.now()},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}]
    }, {collection: "user"});

    return UserSchema;
};