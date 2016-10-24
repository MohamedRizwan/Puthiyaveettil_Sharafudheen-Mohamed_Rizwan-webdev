/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location)
    {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        vm.updatePage = updatePage;
        var currentPage = PageService.findPageByWebsiteId(websiteId);
        vm.currentPage = currentPage;
        vm.name = currentPage.name;
        vm.wid = currentPage.wid;
        function updatePage(pageId, page)
        {
            vm.name = page.name;
            vm.wid = page.wid;
            var updatedPage = PageService.updatePage(pageId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }

        vm.deletePage = deletePage;
        function deletePage(pageId)
        {
            console.log(pageId);
            var result = PageService.deletePage(pageId);
            console.log(result);
            if(result)
            {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else
            {
                vm.error = "Unable to delete page";
            }

        }
    }
})();