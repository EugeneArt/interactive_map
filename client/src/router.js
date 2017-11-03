angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/main/content");
    $stateProvider
      .state('app', {
          url: '/app',
          abstract: true,
          permissions: false,
          module: false,
          template: '<app-component></app-component>'
      })
      .state('app.main', {
          url: '/main',
          abstract: true,
          permissions: false,
          module: false,
          views: {
              'navigation@app': {
                  template: '<navigation-component ' +
                            '</navigation-component>'
              },
              'content@app': {
                  template: '<main-component ' +
                            '</main-component>'
              }

          }
      })
      .state('app.main.services', {
          url: '/content',
          permissions: false,
          module: false,
          views: {
              'sidebar@app.main': {
                  template: '<sidebar-component ' +
                            'list="$resolve.list">' +
                            '</sidebar-component>'
              }
          },
          resolve: {
              list: ['serviceEntity', function (serviceEntity) {
                  return serviceEntity.fetchAll();
              }]
          }
      })
      .state('app.main.services.service', {
          url: '/:id',
          permissions: false,
          module: false,
          views: {
              'content@app.main': {
                  template: '<content-component ' +
                            'item="$resolve.item">' +
                            '</content-component>'
              }
          },
          resolve: {
              item: ['$stateParams', 'serviceEntity', function ($stateParams, serviceEntity) {
                  return serviceEntity.fetchOne($stateParams.id);
              }]
          }
      })




      // .state('app.main.treatment', {
      //     url: '/treatment',
      //     permissions: false,
      //     module: false,
      //     views: {
      //         'sidebar@app.main': {
      //             template: '<sidebar-component ' +
      //                       '</sidebar-component>'
      //         },
      //         'content@app.main': {
      //             template: '<content-component ' +
      //                       '</content-component>'
      //         }
      //     }
      // })

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
                'navigation@app': {
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
                paths: ['$stateParams','findPathEntity', function ($stateParams, findPathEntity) {
                   return findPathEntity.fetchAll({params: $stateParams});
                }]
            }
      })
  });