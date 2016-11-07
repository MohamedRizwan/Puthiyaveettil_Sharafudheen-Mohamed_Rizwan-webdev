/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;

        console.log(pageId)

        vm.createHeaderWidget = createHeaderWidget;
        function createHeaderWidget() {
            var widget = {"_id": 0, "widgetType": "HEADER", "pageId": pageId, "size": 2, "text": " "};
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);

            promise
                .success(function headerWidget(newHeaderWidget) {
                    if (newHeaderWidget) {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHeaderWidget._id);
                    }
                })
                .error(function (failure) {
                    console.log("header widget could not be created");
                    console.log(failure);
                })

        }


        vm.createHtmlWidget = createHtmlWidget;
        function createHtmlWidget() {
            var widget = {"_id": 0, "widgetType": "HTML", "pageId": pageId, "text": " "};
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);


            promise
                .success(function newHtmlWidget(newHtmlWidget) {
                    if (newHtmlWidget) {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newHtmlWidget._id);
                    }
                })
                .error(function (failure) {
                    console.log("html widget could not be created");
                    console.log(failure);
                })

        }


        vm.createImageWidget = createImageWidget;
        function createImageWidget() {
            var widget = {
                "_id": 0,
                "widgetType": "IMAGE",
                "pageId": pageId,
                "width": 100,
                "url": null,
                "imageData": ""
            };
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);
            vm.widget = widget;
            console.log(widget);
            promise
                .success(function newImageWidget(newImageWidget) {
                    if (newImageWidget) {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newImageWidget._id);
                    }
                })
                .error(function (failure) {
                    console.log("image widget could not be created");
                    console.log(failure);
                });

        }


        vm.createYoutubeWidget = createYoutubeWidget;
        function createYoutubeWidget() {
            var widget = {
                "_id": 0,
                "widgetType": "YOUTUBE",
                "pageId": pageId,
                "width": 100,
                "url": "https://www.youtube.com/watch?v=o032WQMzUcI"
            };
            var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);

            promise
                .success(function newYoutubeWidget(newYoutubeWidget) {
                    if (newYoutubeWidget) {
                        $location.url("/user/" + vm.userId + "/website/" +
                            vm.websiteId + "/page/" + vm.pageId + "/widget/" + newYoutubeWidget._id);
                    }
                })
                .error(function (failure) {
                    console.log("youtube widget could not be created");
                    console.log(failure);
                });
        }
    }
})();
