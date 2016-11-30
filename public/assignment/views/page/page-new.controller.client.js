/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.createPage = createPage;
        function createPage(name, description) {

            var page = {name: vm.name, title: vm.title}
            var promise = PageService.createPage(userId, websiteId, page);
            promise
                .success(function page(newPage) {

                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");

                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function init() {
            var promise = PageService.findPageByWebsiteId(userId,websiteId);
            promise
                .success(function page(website) {
                    if (website.pages) {
                        vm.pages = website.pages;
                    }
                })
                .error(function errorHandler(failure) {
                    console.log(failure);
                });

        }

        init();
    }


})();
/*
 (function () {
 angular
 .module("WebAppMaker")
 .controller("NewPageController", NewPageController);

 function NewPageController($routeParams, $location, PageService) {
 var vm = this;
 //var userId = parseInt($routeParams['uid']);
 var userId = $routeParams['uid'];
 vm.userId = userId;
 //var websiteId = parseInt($routeParams['wid']);
 var websiteId = $routeParams['wid'];
 vm.websiteId = websiteId;
 vm.createPage = createPage;
 //vm.pages = PageService.findPageByWebsiteId(websiteId);
 var promise = PageService.findPageByWebsiteId(userId, websiteId);
 promise
 .success(function pages(pages) {
 if (pages != '0') {
 vm.pages = pages;

 var userId = parseInt($routeParams['uid']);
 vm.pages = pages;
 }
 })
 .error(function errorHandler(err) {
 console.log(err);
 })

 function createPage(name) {
 var page = {_id: "0", name: name, wid: websiteId};
 var promise = PageService.createPage(userId, websiteId, page);
 promise
 .success(function page(newPage) {
 if (newPage) {
 $location.url("/user/" + userId + "/website/" + websiteId + "/page");
 }
 })
 .error(function (err) {
 console.log(err);
 });

 }
 }
 })();
 */
