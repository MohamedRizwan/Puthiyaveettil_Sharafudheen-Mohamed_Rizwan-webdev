/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, $location) {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];
        /*var pages = PageService.findPageByWebsiteId(websiteId);*/
        var promise = PageService.findPageByWebsiteId(userId, websiteId);
        promise
            .success(function pages(pages) {
                if (pages != '0') {
                    vm.pages = pages;

                    var userId = parseInt($routeParams['uid']);
                    vm.websiteId = $routeParams['wid'];
                    vm.userId = userId;
                    vm.pages = pages;
                    vm.goToWidgetList = goToWidgetList;
                    function goToWidgetList(page) {

                        $location.url("/user/" + userId.toString() + "/website/" + vm.websiteId + "/page/" +
                            page._id.toString() + "/widget");

                    }
                }
            })
            .error(function errorHandler(aaa) {
                console.log(aaa);
            })

    }
})();

