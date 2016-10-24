/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(wid) {
            for (var w in websites) {
                if (parseInt(websites[w]._id) === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function findWebsitesByUser(uid) {
            var result = [];
            for (var w in websites) {
                if (parseInt(websites[w].developerId) === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function createWebsite(userId, website) {
            for (var w in websites) {
                var existingWebsite = websites[w];
                if (existingWebsite.name === website.name) {
                    return null;
                }
            }


            var newWebsiteId = parseInt(websites[websites.length - 1]._id) + 1;
            var newWebSite = {
                _id: newWebsiteId.toString(),
                name: website.name,
                developerId: userId,
                description: website.description
            };

            websites.push(newWebSite);
            return newWebSite;
        }

        function updateWebsite(websiteId, website) {
            var currentWebsite;
            for (var w in websites) {
                currentWebsite = websites[w];
                if (currentWebsite._id.toString() === websiteId.toString()) {
                    currentWebsite.name = website.name;
                    currentWebsite.description = website.description;
                    return currentWebsite;
                }
                return currentWebsite;
            }
        }

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id.toString() === websiteId.toString()) {
                    websites.splice(parseInt(w), 1);
                    return true;
                }
            }
            return false;
        }

    }

})();