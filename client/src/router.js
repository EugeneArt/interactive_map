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
          .state('app.route', {
            url: '/route',
            permissions: false,
            module: false,
            views: {
              'navigation@app': {
                template: '<navigation-component ' +
                '</navigation-component>'
              },
              'content@app': {
                template: '<route-component ' +
                '</route-component>'
              }
            }
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
                template: '<service-content-component ' +
                'content="$resolve.content">' +
                '</service-content-component>'
              }
            },
            resolve: {
              content: ['$stateParams', 'serviceEntity', function ($stateParams, serviceEntity) {
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
                template: '<room-content-component ' +
                'content="$resolve.content">' +
                '</room-content-component>'
              }
            },
            resolve: {
              content: ['$stateParams', 'roomEntity', function ($stateParams, roomEntity) {
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
                template: '<therapy-content-component ' +
                'item="$resolve.item">' +
                '</therapy-content-component>'
              }
            },
            resolve: {
              item: ['$stateParams', 'therapyEntity', function ($stateParams, therapyEntity) {
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
                template: '<therapy-content-component ' +
                'subtherapy="true" ' +
                'item="$resolve.item"> ' +
                '</therapy-content-component>'
              }
            },
            resolve: {
              item: ['$stateParams', 'subTherapyEntity', function ($stateParams, subTherapyEntity) {
                return subTherapyEntity.fetchOne($stateParams.subTherapyId);
              }]
            }
          })
          .state('admin', {
            url: '/admin',
            abstract: true,
            permissions: false,
            module: false,
            template: '<admin-component></admin-component>'
          })
          .state('admin.shemeList', {
            url: '/schemelist',
            permissions: false,
            module: false,
            template: '<scheme-component ' +
                      'schemelist="$resolve.schemelist">' +
                      '</scheme-component>',
            resolve: {
              schemelist: ['schemeEntity', function (schemeEntity) {
                return schemeEntity.fetchAll();
              }]
            }
          })
          .state('admin.sсhemeList', {
            url: '/schemelist',
            permissions: false,
            module: false,
            template: '<scheme-component ' +
                      'schemelist="$resolve.schemelist">' +
                      '</scheme-component>',
            resolve: {
              schemelist: ['schemeEntity', function (schemeEntity) {
                return schemeEntity.fetchAll();
              }]
            }
          })
          .state('admin.schemeUpdate', {
            url: '/schemeupdate/:schemeId',
            permissions: false,
            module: false,
            template: '<scheme-update-component ' +
                      'model="$resolve.item">' +
                      '</scheme-update-component>',
            resolve: {
              item: ['$stateParams', 'schemeEntity', function ($stateParams, schemeEntity) {
                return schemeEntity.fetchOne($stateParams.schemeId);
              }]
            }
          })
          .state('admin.floorCreate', {
            url: '/floorcreate',
            permissions: false,
            module: false,
            template: '<floor-create-component ' +
                      'buildings="$resolve.buildings">' +
                      '</floor-create-component>',
            resolve: {
              buildings: ['buildingEntity', function (buildingEntity) {
                return buildingEntity.fetchAll();
              }]
            }
          })
          .state('admin.floorUpdate', {
            url: '/floorupdate/:buildingId/:floorId',
            permissions: false,
            module: false,
            template: '<floor-update-component ' +
                      'model="$resolve.item">' +
                      '</floor-update-component>',
            resolve: {
              item: ['$stateParams', 'floorEntity', function ($stateParams, floorEntity) {
                return floorEntity.fetchOne($stateParams.floorId);
              }]
            }
          })
          .state('admin.buildingList', {
            url: '/buildinglist',
            permissions: false,
            module: false,
            template: '<building-list-component ' +
                      'buildings="$resolve.buildings">' +
                      '</building-list-component>',
            resolve: {
              buildings: ['buildingEntity', function (buildingEntity) {
                return buildingEntity.fetchAll();
              }]
            }
          })
    });