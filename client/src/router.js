angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/albums");
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            permissions: false,
            module: false,
            template: '<app-component></app-component>',
            resolve: {
                albums: ['albumsEntity', function (albumsEntity) {
                    return albumsEntity.fetchAll();
                }]
            }
        })
        .state('app.albumList', {
            url: '/albums',
            permissions: false,
            module: false,
            views: {
                'content@app': {
                    template: '<album-list-component ' +
                                'albums="$resolve.albums">' +
                              '</album-list-component>'
                }
            }
        })
        .state('app.albumListAdmin', {
            url: '/albums/admin',
            permissions: false,
            module: false,
            views: {
                'content@app': {
                    template: '<album-list-component ' +
                                'albums="$resolve.albums"' +
                                'admin="true">' +
                              '</album-list-component>'
                }
            }
        })
  });