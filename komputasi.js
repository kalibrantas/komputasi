var app = angular.module('komputasiApp', ['ngSanitize']);
app.controller('MenuController', function ($scope, $http, $sce, $compile) {
    var menu = this;
    $http.get("content/menu.json").then(function (res) {
        menu.listMenu = res.data.menu;
    });
    menu.render = function (content) {
        $http.get(content).then(function (res) {
            menu.content = $sce.trustAsHtml(res.data);
//            $compile( menu.content)($scope);
            hljs.initHighlightingOnLoad();
        });
    }
    menu.coba="coba coba"
    menu.render("content/home.html");
});