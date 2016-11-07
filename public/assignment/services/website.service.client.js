/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;
        function findWebsitesByUser(uid) {
            var url = "/api/user/" + uid + "/website";
            return $http.get(url);
        }

        function findWebsiteById(userId, websiteId) {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.get(url);
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function updateWebsite(userId, websiteId, website) {
            console.log("website to be updated");
            console.log(website);
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(userId, websiteId) {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();