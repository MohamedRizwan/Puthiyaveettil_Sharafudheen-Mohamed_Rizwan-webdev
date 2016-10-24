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
            var newWebsite = WebsiteService.createWebsite(userId, website);
            if (newWebsite) {
                $location.url("/user/" + vm.userId + "/website");
            }
            else {
                vm.error = "Unable to create website";
            }
        }

        vm.goToPageList = goToPageList;
        function goToPageList(website) {
            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }
    }
})();