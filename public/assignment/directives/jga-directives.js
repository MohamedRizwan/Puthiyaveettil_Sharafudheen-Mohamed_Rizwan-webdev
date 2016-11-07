/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
(function(){
    angular
        .module("utility", [])
        .directive("sortable", sortable);

    function sortable()
    {
        function linker(scope, element, attributes)
        {
            console.log(attributes);
            var startIndex = -1;
            var stopIndex = -1;
            $(element[0]).sortable({


                start: function (event, ui){
                    startIndex = $(ui.item).index();
                    console.log(startIndex + "start index");
                },
                stop: function(event, ui){
                    stopIndex = $(ui.item).index();
                    console.log(stopIndex + "stop index");
                    scope.sortableController.sort(startIndex, stopIndex, attributes.userid, attributes.websiteid, attributes.pageid);
                },
                axis:'y'
            });

            console.log($(element[0]).sortable( "toArray" ));
        }
        return {
            scope: {
            },
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService)
    {
        var vm = this;
        vm.sort = sort;

        function sort(start, stop, userId, websiteId, pageId)
        {
            console.log(start+" start index from widget utility");
            console.log(stop+" stop index from widget utility");
            WidgetService.sort(start, stop, userId, websiteId, pageId);
        }
    }
})();