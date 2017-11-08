angular
  .module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/main/services");
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
          url: '/services',
          permissions: false,
          module: false,
          views: {
              'sidebar@app.main': {
                  template: '<sidebar-component ' +
                            'name="services"' +
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
      .state('app.main.rooms', {
          url: '/rooms',
          permissions: false,
          module: false,
          views: {
              'sidebar@app.main': {
                  template: '<sidebar-component ' +
                            'name="rooms"' +
                            'list="$resolve.list">' +
                            '</sidebar-component>'
              }
          },
          resolve: {
              list: ['roomEntity', function (roomEntity) {
                  return roomEntity.fetchAll();
              }]
          }
      })
      .state('app.main.rooms.room', {
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
              item: ['$stateParams', 'roomEntity', function ($stateParams,roomEntity) {
                  return roomEntity.fetchOne($stateParams.id);
              }]
          }
      })
      .state('app.main.therapy', {
          url: '/therapy',
          permissions: false,
          module: false,
          views: {
              'sidebar@app.main': {
                  template: '<sidebar-component ' +
                            'name="therapy"' +
                            'list="$resolve.list">' +
                            '</sidebar-component>'
              }
          },
          resolve: {
              list: ['therapyEntity', function (therapyEntity) {
                  return therapyEntity.fetchAll();
              }]
          }
      })
      .state('app.main.therapy.treat', {
          url: '/:therapyId',
          permissions: false,
          module: false,
          views: {
             'content@app.main': {
                  template: '<content-component ' +
                            'name="subtherapy" ' +
                            'item="$resolve.item">' +
                            '</content-component>'
              }
          },
          resolve: {
              item: ['$stateParams', 'therapyEntity', function ($stateParams,therapyEntity) {
                  return therapyEntity.fetchOne($stateParams.therapyId);
              }]
          }
      })
      .state('app.main.therapy.treat.subtherapy', {
          url: '/:subTherapyId',
          permissions: false,
          module: false,
          views: {
             'content@app.main': {
                  template: '<content-component ' +
                            'name="subtherapy" ' +
                            'item="$resolve.item">' +
                            '</content-component>'
              }
          },
          resolve: {
              item: ['$stateParams', 'subTherapyEntity', function ($stateParams, subTherapyEntity) {
                  return subTherapyEntity.fetchOne($stateParams.subTherapyId);
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