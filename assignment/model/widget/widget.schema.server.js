/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        // dateCreated: {type: new Date(), default: Date.now()},
        widgetType: {
            type: String,
            enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']
        }
    });

    return WidgetSchema;
}