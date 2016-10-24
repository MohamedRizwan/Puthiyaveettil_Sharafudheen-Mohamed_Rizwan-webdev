/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var currentWebsite = WebsiteService.findWebsiteById(websiteId);
        vm.currentWebsite = currentWebsite;
        vm.name = currentWebsite.name;
        vm.description = currentWebsite.description;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;

        vm.updateWebsite = updateWebsite;
        function updateWebsite(name, description) {
            vm.name = name;
            vm.description = description;
            var updatedWebsite = WebsiteService.updateWebsite(websiteId, {name: name, description: description});
            $location.url("/user/" + vm.userId + "/website/");
        }

        vm.deleteWebsite = deleteWebsite;
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if (result) {
                $location.url("/user/" + vm.userId + "/website");
            }
            else {
                vm.error = "Unable to delete website";
            }
        }

        vm.goToPageList = goToPageList;
        function goToPageList(website) {
            $location.url("/user/" + userId.toString() + "/website/" + website._id.toString() + "/page");
        }

    }
})();