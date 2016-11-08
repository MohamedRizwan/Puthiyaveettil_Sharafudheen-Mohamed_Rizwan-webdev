/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;


        function updatePage(userId, websiteId, pageId, name, title) {
            var promise = PageService.updatePage(userId, websiteId, pageId, {name: vm.page.name, title: vm.page.title});
            promise
                .success(function page(page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function errorHandler(err) {
                    console.log(err);
                })


        }


        function deletePage(userId, websiteId, pageId) {
            var promise = PageService.deletePage(userId, websiteId, vm.pageId);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {

                });


        }

        function init() {

            var promise = PageService.findPageById(userId, websiteId, pageId);
            promise
                .success(function page(page) {
                    if (page) {
                        vm.page = page;
                        console.log("found page");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        init();


    }
})();
