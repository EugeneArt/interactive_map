angular
  .module('app')
  .config(function ($httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  });
