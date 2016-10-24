/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.goToPageList = goToPageList;
        vm.userId = userId;

        vm.websites = WebsiteService.findWebsitesByUser(userId);

        function goToPageList(website) {
            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }
    }
})();