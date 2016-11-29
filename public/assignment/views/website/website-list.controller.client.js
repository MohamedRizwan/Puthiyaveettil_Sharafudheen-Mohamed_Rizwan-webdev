/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.goToPageList = goToPageList;
        vm.userId = userId;

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

        function goToPageList(website) {
            console.log(website);
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId + "/website/" + website._id + "/page");
        }
    }
})();
