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
        /*var websites = WebsiteService.findWebsitesByUser(userId);
         vm.websites = websites;*/
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function updateWebsite(websiteId, name, description) {
            var promise = WebsiteService.updateWebsite(userId, websiteId, {
                name: vm.website.name,
                description: vm.website.description
            });
            promise
                .success(function website(website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function errorHandler(aaa) {
                    console.log(aaa);
                })

        }


        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(userId, vm.websiteId);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {

                })

        }

        vm.goToPageList = goToPageList;
        function goToPageList(website) {
            console.log(website);
            vm.website = website;
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId.toString() + "/website/" + vm.website._id.toString() + "/page");
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
                .error(function errorHandler(aaa) {
                    console.log(aaa);
                });

            var findWeb = WebsiteService.findWebsiteById(userId, websiteId);
            findWeb
                .success(function website(website) {
                    if (website) {
                        vm.website = website;
                        console.log("found website");
                    }
                })
                .error(function errorHandler(aaa) {
                    console.log(aaa);
                })

        }

        init();

    }
})();
