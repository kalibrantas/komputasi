var app = angular.module('komputasiApp', ['ngSanitize']);
app.controller('MenuController', function ($scope, $http, $sce, $compile) {
    var menu = this;
    $http.get("content/menu.json").then(function (res) {
        menu.listMenu = res.data.menu;
    });
    menu.render = function (content) {
        $http.get(content).then(function (res) {
            $compile(res.data)($scope);
            menu.content = $sce.trustAsHtml(res.data);
            setTimeout(function () {
                hljs.initHighlighting();
            }, 500);
        });
    }
    menu.render("content/home.html");
});

app.directive('ngHtml', ['$compile', function ($compile) {
        return function (scope, elem, attrs) {
            console.log(elem)
            if (attrs.ngHtml) {
                elem.html(scope.$eval(attrs.ngHtml));
                $compile(elem.contents())(scope);
            }
            scope.$watch(attrs.ngHtml, function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    elem.html(newValue);
                    $compile(elem.contents())(scope);
                }
            });
        };
    }]);
