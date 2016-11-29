/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        vm.createWebsite = createWebsite;
        function createWebsite(name, description) {

            var website = {name: name, uid: userId, description: description};
            var promise = WebsiteService.createWebsite(userId, website);
            promise
                .success(function website(website) {
                    $location.url("/user/" + vm.userId + "/website");
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
                .success(function website(user) {
                    if (user.websites) {
                        vm.websites = user.websites;
                        console.log(user.websites);
                    }

                })
                .error(function errorHandler(failure) {
                    console.log(failure);
                });

        }

        init();
    }
})();
