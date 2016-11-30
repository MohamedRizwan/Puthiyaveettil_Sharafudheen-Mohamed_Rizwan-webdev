/**
 * Created by Rizwan Mohamed on 11/26/2016.
 */
module.exports = function(){
    var model = {};
    var maxOrder;
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reOrderWidget: reOrderWidget,
        setModel: setModel

    }
    return api;

    function setModel(_model)
    {
        model = _model;
        //TODO:
        WidgetModel.find().sort({order:-1})
            .then(function (widgets) {
                if(widgets.length > 0)
                    maxOrder = widgets[0].order + 1;
                else
                    maxOrder = 1;
            });
    }

    function findAllWidgetsForPage(pageId)
    {
        //return model.pageModel.findAllWidgetsForPage(pageId);
        return model.pageModel
            .findPageById(pageId)
            .then(
                function (pageObj) {
                    return WidgetModel.find({_page: pageObj}).sort({order: 1});
                }
            );
    }

    function createWidget(pageId, widget)
    {
        widget.order = maxOrder;
        maxOrder++;
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

    function reOrderWidget(pageId, start, end) {
        return model.pageModel
            .findPageById(pageId)
            .then(
                function (pageObj) {
                    WidgetModel.find({_page: pageObj}).sort({order: 1})
                        .then(
                            function (widgets) {
                                widgets[start].order = widgets[end].order;
                                widgets[start].save();
                                if(start < end) {
                                    for(var w in widgets) {
                                        if(w > start && w <= end) {
                                            widgets[w].order--;
                                            widgets[w].save();
                                        }
                                    }
                                } else {
                                    for(var w in widgets) {
                                        if(w >= end && w < start) {
                                            widgets[w].order++;
                                            widgets[w].save();
                                        }
                                    }
                                }
                            }
                        );
                }
            );
    }
}