/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        vm.createWebsite = createWebsite;
        function createWebsite(name, description) {

            var website = {_id: "0", name: name, uid: userId, description: description};
            var promise = WebsiteService.createWebsite(userId, website);
            promise
                .success(function website(website) {
                    if (website) {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (failure) {
                    console.log(failure);
                });

        }

        vm.goToPageList = goToPageList;
        function goToPageList(website) {

            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }


        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .success(function website(websites) {
                    if (websites) {
                        vm.websites = websites;
                        console.log(websites);
                    }

                })
                .error(function errorHandler(failure) {
                    console.log(failure);
                });

        }

        init();
    }
})();
