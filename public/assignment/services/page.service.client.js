/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            { _id: "321", name: "Post 1", wid: 456},
            { _id: "432", name: "Post 2", wid: 456},
            { _id: "543", name: "Post 3", wid: 456}
        ];

        var api =
        {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page)
        {
            var newPageId = parseInt(pages[pages.length - 1]._id) + 1;
            var pageExists = false;
            for(var p in pages)
            {
                var existingPage = pages[p];
                if(existingPage.name === page.name)
                {
                    pageExists = true;
                    return null;
                }
            }

            var newPage =
            {
                _id: newPageId.toString(),
                name: page.name,
                wid: websiteId
            };

            pages.push(newPage);
            return newPage;

        }

        function findPageByWebsiteId(websiteId)
        {
            var result = [];
            for(var p in pages)
            {
                var tempo = pages[p];
                if(parseInt(tempo.wid) === parseInt(websiteId))
                {
                    result.push(tempo);
                }
            }
            return result;
        }

        function findPageById(pageId)
        {

            for(var p in pages)
            {
                if(parseInt(pages[p]._id) === pageId)
                {
                    return pages[p];
                }
            }
            return false;
        }

        function updatePage(pageId, page)
        {
            var currentPage;
            for(var p in pages)
            {
                currentPage = pages[p];
                if(currentPage._id.toString() === pageId.toString())
                {
                    currentPage.name = page.name;

                    return currentPage;
                }
            }
            return currentPage;
        }

        function deletePage(pageId)
        {
            var i;
            var found = false;
            for(i in pages)
            {
                if(pages[i]._id.toString() === pageId.toString())
                {
                    found = true;
                    break;

                }
            }

            if(found)
            {
                pages.splice(i,1);
                return true;
            }
            return false;
        }
    }
})();