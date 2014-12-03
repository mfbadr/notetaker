(function(){
  'use strict';

  angular.module('hapi-auth', ['ui.router', 'LocalForageModule'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',         {url:'/',                      templateUrl:'/views/home/home.html'})
        .state('register',     {url:'/register',              templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('login',        {url:'/login',                 templateUrl:'/views/users/users.html',        controller:'UsersCtrl'});

      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }]);

})();
