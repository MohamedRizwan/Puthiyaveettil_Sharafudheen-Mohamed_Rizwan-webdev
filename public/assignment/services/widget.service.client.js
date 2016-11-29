/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http)
    {
        var idGenerator = 1500;
        console.log(idGenerator);


        var api =
        {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort

        };
        return api;

        function createWidget(userId, websiteId, pageId, widget)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.post(url, widget);

        }

        function findWidgetsByPageId(userId, websiteId, pageId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId.toString()+"/widget";

            return $http.get(url);


        }

        function findWidgetById(userId, websiteId, pageId, widgetId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.get(url);


        }

        function updateWidget(userId, websiteId, pageId, widgetId, widget)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.put(url, widget);

        }

        function deleteWidget(userId, websiteId, pageId, widgetId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url, widgetId);


        }

        function sort(start, stop, userId, websiteId, pageId)
        {
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget?start=START&stop=STOP";
            url = url.replace("START", start)
                .replace("STOP", stop);
            console.log(start + "start");
            console.log(stop + "stop");
            $http.put(url);
        }
    }
})();