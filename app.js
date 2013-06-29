var runn = angular.module('app', 
    ['ngResource', 'todo'])
    .config(function($routeProvider){
        $routeProvider
            .when('/login', {
                templateUrl: 'html/welcome.html'
            })
            .when('/mytraining', {
                templateUrl: 'html/todo.html'
            })
            .when('/schedule', {
                templateUrl: 'html/schedule.html'
            })
            .when('/main', {
                templateUrl: 'html/main.html'
            })
            .when('/setup', {
                templateUrl: 'html/setup.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });