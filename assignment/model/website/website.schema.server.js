/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        name: String,
        description: String,
        // dateCreated: {type: new Date(), default: Date.now()},
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}]
    });

    return WebsiteSchema;
};