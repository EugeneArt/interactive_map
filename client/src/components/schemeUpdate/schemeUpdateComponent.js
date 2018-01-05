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

function schemeUpdateComponentController(mapEntity, $state, $scope, canvasMap) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;
  vm.getMap = getMap;
  vm.removeBuilding = removeBuilding;
  vm.validateBuildings = validateBuildings;
  vm.cancel = cancel;
  vm.onDestroy = onDestroy;

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
    var map = new canvasMap.CanvasRouteMap(options);
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

  function removeBuilding(event, building) {
    var index = vm.model.buildings.indexOf(building);
    vm.model.buildings.splice(index, 1)
  }

  function validateBuildings() {
    var flag = false;
    vm.model.rooms.forEach(function (room) {
      if (!Object.keys(room.coordinate) || !room.number) {
        room.noValid = true;
        flag = !flag;
      }
    });
    return flag;
  }

  function cancel() {
     $state.go('admin.sсhemeList', {}, {reload: true});
  }

  var removeBuildingListener = $scope.$on('removeBuildingListener', removeBuilding);

  function onDestroy() {
    $scope.$on('$destroy', removeBuildingListener);
  }

}
