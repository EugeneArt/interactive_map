angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/navigation");
    $stateProvider
      .state('app', {
          url: '/app',
          abstract: true,
          permissions: false,
          module: false,
          template: '<app-component></app-component>'
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
          },
          resolve: {
              schemelist: ['schemeEntity', function (schemeEntity) {
                  return schemeEntity.fetchAll();
              }]
          }
      })
      .state('app.floorList', {
          url: '/floorlist',
          permissions: false,
          module: false,
          views: {
              'content@app': {
                  template: '<floor-component ' +
                              'buildings="$resolve.buildings"' +
                            '</floor-component>'
              }
          },
          resolve: {
              buildings: ['buildingEntity', function (buildingEntity) {
                  return buildingEntity.fetchAll();
              }]
          }
      })
      .state('app.search', {
            url: '/search?floor&room',
            permissions: false,
            module: false,
            views: {
                'nav@app': {
                    template: '<navigation-component ' +
                                'rooms="$resolve.rooms"' +
                              '</navigation-component>'
                },
                'content@app': {}
            },
            resolve: {
                rooms: ['roomEntity', function (roomEntity) {
                    return roomEntity.fetchAll();
                }],
                path: ['$stateParams','findPathEntity', function ($stateParams, findPathEntity) {
                   return findPathEntity.fetchAll({params: $stateParams});
                }]
            }
      })
  });