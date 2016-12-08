/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService,
                                  $location, $sce) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        //var widgetId = parseInt($routeParams['wgid']);

        var widgetId = $routeParams['wgid'];
        vm.widgetId = widgetId;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.goToChooseWidget = goToChooseWidget;
        vm.checkSafeImageSrc = checkSafeImageSrc;
        function checkSafeImageSrc(url) {
            return $sce.trustAsResourceUrl(url);

        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];

            url = "https://www.youtube.com/embed/" + id;

            return $sce.trustAsResourceUrl(url);

        }

        function goToChooseWidget() {
            $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.userId, vm.websiteId, vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function () {

                });
        }

        init();
    }
})();
