angular
  .module('app')
  .component('schemeUpdateComponent', {
    templateUrl: '/src/components/schemeUpdate/schemeUpdateView.html',
    bindings: {
      model: '<'
    },
    controller: schemeUpdateComponentController
  })
;

function schemeUpdateComponentController(mapEntity, $state, $scope) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;
  vm.getMap = getMap;

  function onInit() {
    vm.container = angular.element(document.querySelector("#container"));
    vm.showForm = false;
    vm.getMap();
  }

  function getMap() {
    mapEntity.fetchOne(vm.model.map).then(function (response) {
      createMap(response.image);
    });
  }

  function createMap(url) {
    var options = {
      container: vm.container,
      url: url,
      canvas: {
        width: 1080,
        height: 608,
        initialWidth: 1080,
        scale: false
      }
    };
    var map = new canvasRouteMap.CanvasRouteMap(options);
    map.ready(function () {
      vm.showForm = true;
      $scope.$apply();
    });
  }

  function addBuilding() {
    vm.buildings = {};
    vm.model.buildings.push(vm.buildings);
  }

  function saveScheme() {
    vm.model.$save().then(function () {
      $state.reload();
    });
  }

}
