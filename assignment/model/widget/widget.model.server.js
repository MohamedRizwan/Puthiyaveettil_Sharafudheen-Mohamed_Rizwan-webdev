/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        // reOrderWidget: reOrderWidget,
        setModel: setModel

    }
    return api;

    function setModel(_model)
    {
        model = _model;
    }

    function findAllWidgetsForPage(pageId)
    {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function createWidget(pageId, widget)
    {
        return WidgetModel
            .create(widget)
            .then(function(WidgetObj){
                return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function(PageObj){
                        PageObj.widgets.push(WidgetObj);
                        WidgetObj._page = PageObj._id;
                        //WidgetObj.save();
                        PageObj.save();
                        return WidgetObj.save();
                    })
            })
    }

    function findWidgetById(widgetId)
    {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {_id: widgetId},
            widget
        );
    }

    function deleteWidget(widgetId)
    {
        return WidgetModel.remove({_id: widgetId});
    }
}