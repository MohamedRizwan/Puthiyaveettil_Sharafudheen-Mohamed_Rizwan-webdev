/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function()
{
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: String,
        title: String,
        // dateCreated: {type: new Date(), default: Date.now()},
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}]
    });

    return PageSchema;
}