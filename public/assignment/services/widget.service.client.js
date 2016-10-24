/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =
            [
                {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {
                    "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<h3><span class="mw-headline" ' +
                'id="Sale_of_headquarters_and_relocation_to_Jersey_City">' +
                'Sale of headquarters and relocation to Jersey City</span><span class="mw-editsection">' +
                '<span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Forbes&amp;action=edit&amp;' +
                'section=2" title="Edit section: Sale of headquarters and relocation to Jersey City">edit</a><span ' +
                'class="mw-editsection-bracket">]</span></span></h3>'
                },
                {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E"
                },
                {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api =
        {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;

        function createWidget(pageId, widget) {
            var newWidgetId = parseInt(widgets[widgets.length - 1]._id) + 1;

            if (widget.widgetType.toString() == "HEADER") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    size: widget.size,
                    text: widget.text
                };
                widgets.push(newWidget);
                return newWidget;
            }

            if (widget.widgetType.toString() == "IMAGE") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    width: widget.width,
                    text: widget.text
                };
                widgets.push(newWidget);
                return newWidget;
            }

            if (widget.widgetType.toString() == "YOUTUBE") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    width: widget.width,
                    text: widget.text
                };
                widgets.push(newWidget);
                return newWidget;
            }

            if (widget.widgetType.toString() == "HTML") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    text: widget.text
                };
                widgets.push(newWidget);
                return newWidget;
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var wg in widgets) {
                if (parseInt(widgets[wg].pageId) === pageId) {
                    result.push(widgets[wg]);
                }
            }
            console.log(result);
            return result;
        }

        function findWidgetById(widgetId) {
            for (var wg in widgets) {
                if (parseInt(widgets[wg]._id) === widgetId) {
                    return widgets[wg];
                }
            }
            return false;

        }

        function updateWidget(widgetId, widget) {
            var newWidgetId = parseInt(widgets[widgets.length - 1]._id) + 1;
            console.log(widgetId);
            console.log(widget);
            if (widget.widgetType.toString() == "HEADER") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    size: widget.size,
                    text: widget.text
                };
                return newWidget;

            }

            if (widget.widgetType.toString() == "HTML") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    text: widget.text
                };
                return newWidget;

            }

            if (widget.widgetType.toString() == "IMAGE") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    width: widget.width,
                    text: widget.text
                };
                return newWidget;

            }

            if (widget.widgetType.toString() == "YOUTUBE") {
                var newWidget = {
                    _id: newWidgetId.toString(),
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    width: widget.width,
                    text: widget.text
                };
                return newWidget;

            }

        }

        function deleteWidget(widgetId) {
            var i;
            var found = false;
            for (i in widgets) {
                if (widgets[i]._id.toString() === widgetId.toString()) {
                    found = true;
                    break;

                }
            }

            if (found) {
                widgets.splice(i, 1);
                return true;
            }
            return false;
        }
    }
})();