/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        vm.createPage = createPage;
        function createPage(name) {
            var page = {_id: "0", name: name, wid: websiteId};
            var promise = PageService.createPage(userId, websiteId, page);
            promise
                .success(function page(newPage) {
                    if (newPage) {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    }
                })
                .error(function (aaa) {
                    console.log(aaa);
                });

        }
    }
})();
