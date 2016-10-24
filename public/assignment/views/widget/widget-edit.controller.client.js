/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;
        var widgetId = parseInt($routeParams['wgid']);
        vm.widgetId = widgetId;
        var currentWidget = WidgetService.findWidgetById(widgetId);
        vm.currentWidget = currentWidget;
        vm.updateWidget = updateWidget;

        function updateWidget(widgetId, widget) {
            if (widget.widgetType.toString() == "HEADER") {
                var updatedWidget = WidgetService.updateWidget(widgetId, widget);
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }

            else if (widget.widgetType.toString() == "HTML") {
                var updatedWidget = WidgetService.updateWidget(widgetId, {text: widget.text});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }

            else if (widget.widgetType.toString() == "YOUTUBE") {
                var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url: widget.url});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }

            else if (widget.widgetType.toString() == "IMAGE") {
                var updatedWidget =
                    WidgetService.updateWidget(widgetId, {width: widget.width, url: widget.url});
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
            }


        }

        vm.deleteWidget = deleteWidget;
        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);

            if (result) {
                $location.url("/user/" + vm.userId + "/website/" +
                    vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();