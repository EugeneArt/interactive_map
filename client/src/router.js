angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/schemelist");
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            permissions: false,
            module: false,
            template: '<app-component></app-component>',
            resolve: {
                schemelist: ['schemeEntity', function (schemeEntity) {
                    return schemeEntity.fetchAll();
                }]
            }
        })
        .state('app.shemeList', {
                    url: '/schemelist',
                    permissions: false,
                    module: false,
                    views: {
                        'content@app': {
                            template: '<scheme-component ' +
                                        'schemelist="$resolve.schemelist">' +
                                      '</scheme-component>'
                        }
                    }
        })
  });