/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){

        var api =
        {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(userId, websiteId, page)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page";
            return $http.post(url, page);


        }

        function findPageByWebsiteId(userId, websiteId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page";
            return $http.get(url);


        }

        function findPageById(uid, websiteId, pageId)
        {
            var url = "/api/user/"+uid+"/website/"+websiteId+"/page/"+pageId;
            return $http.get(url);

        }

        function updatePage(userId, websiteId, pageId, page)
        {

            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            return $http.put(url, page);

        }

        function deletePage(userId, websiteId,pageId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;

            return $http.delete(url, pageId);

        }
    }
})();
