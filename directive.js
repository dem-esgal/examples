App.directive('sortableHeader', function () {
    return {
        restrict: "E",
        scope: {
            text:"@",
            sort: "&"
        },
        replace: true,
        template: "<span class=\"sortable-cell\" ng-click='sort()' ng-class='{\"sort-order-desc\":ord,\"sort-selected\":select}'>{{text}}</span>",
        link: function(scope, element, attrs)
        {
            scope.select = (attrs.field==attrs.name);
            scope.ord = attrs.order == "true";
            attrs.$observe('field', function (field) {
                scope.select = (field==attrs.name);
            });
            attrs.$observe('order', function (order) {
                scope.ord = order == "true";
            });
        }
    }
});