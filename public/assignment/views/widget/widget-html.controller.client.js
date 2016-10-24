/**
 * Created by Rizwan Mohamed on 10/23/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetHtmlController", WidgetHtmlController);
    function WidgetHtmlController($location, $routeParams, WidgetService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;
        var widgetId = parseInt($routeParams['wgid']);
        vm.widgetId = widgetId;
    }
})();