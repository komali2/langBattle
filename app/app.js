var app = angular.module('langBattle', [
  'ngRoute',
]);

app.config(function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
      controllerAs: 'home'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
