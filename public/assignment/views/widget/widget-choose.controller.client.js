/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;

        console.log(pageId)

        vm.createHeaderWidget = createHeaderWidget;
        function createHeaderWidget() {
            var widget = {"widgetType": "HEADER", "pageId": pageId, "size": 2, "text": " "};
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

        vm.createTextWidget = createTextWidget;
        function createTextWidget() {
            var widget = {"widgetType": "INPUT", "pageId": pageId, "text": " ", placeholder:" ", rows: " ", formatted:""};
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
            var widget = {"widgetType": "HTML", "pageId": pageId, "text": " "};
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
                "widgetType": "IMAGE",
                "pageId": pageId,
                "width": 100,
                "url": null,
                "imageData": ""
            };
            //var promise = WidgetService.createWidget(userId, websiteId, pageId, widget);
            vm.widget = widget;
            var promise = WidgetService.createWidget(vm.userId, vm.websiteId, vm.pageId, vm.widget);
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
