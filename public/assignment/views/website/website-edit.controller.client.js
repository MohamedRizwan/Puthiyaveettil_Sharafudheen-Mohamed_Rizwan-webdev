/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    function editWebsiteController($routeParams, WebsiteService, $location)
    {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        /*var websites = WebsiteService.findWebsitesByUser(userId);
         vm.websites = websites;*/
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;



        function updateWebsite(websiteId, name, description)
        {

            var promise = WebsiteService.updateWebsite(userId, websiteId, {name: vm.website.name, description: vm.website.description});
            promise
                .success(function website(website){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function errorHandler(err)
                {
                    console.log(err);
                })

        }


        function deleteWebsite()
        {
            var promise = WebsiteService.deleteWebsite(userId, vm.websiteId);
            promise
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function(){

                })

        }

        vm.goToPageList = goToPageList;
        function goToPageList(website)
        {
            console.log(website);
            vm.website = website;
            console.log("/user/" + userId + "/website/" + website._id + "/page");
            $location.url("/user/" + userId.toString() + "/website/" + vm.website._id.toString() + "/page");
        }


        function init(){
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .success(function website(user){
                    if(user.websites)
                    {

                        vm.websites = user.websites;
                        console.log(user.websites);
                    }

                })
                .error(function errorHandler(err){
                    console.log(err);
                });

            var findWeb = WebsiteService.findWebsiteById(userId, websiteId);
            findWeb
                .success(function website(website){
                    if(website)
                    {
                        vm.website = website;
                        console.log("found website");
                    }
                })
                .error(function errorHandler(err)
                {
                    console.log(err);
                })

        }
        init();

    }
})();
/*(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        //var userId = parseInt($routeParams['uid']);
        var userId = $routeParams['uid'];
        vm.userId = userId;
        //var websiteId = parseInt($routeParams['wid']);
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        /!*var websites = WebsiteService.findWebsitesByUser(userId);
         vm.websites = websites;*!/
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
                .error(function errorHandler(err) {
                    console.log(err);
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
                .success(function website(user) {
                    if (user.websites) {

                        vm.websites = user.websites;
                        console.log(user.websites);
                    }

                })
                .error(function errorHandler(err) {
                    console.log(err);
                });

            var findWeb = WebsiteService.findWebsiteById(userId, websiteId);
            findWeb
                .success(function website(website) {
                    if (website) {
                        vm.website = website;
                        console.log("found website");
                    }
                })
                .error(function errorHandler(err) {
                    console.log(err);
                })

        }

        init();

    }
})();*/
