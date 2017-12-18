angular
  .module('app')
  .component('floorUpdateComponent', {
    templateUrl: '/src/components/floorUpdate/floorUpdateView.html',
    bindings: {
      model: '<'
    },
    controller: floorUpdateComponentController
  })
;

function floorUpdateComponentController(mapEntity, $scope, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveFloor = saveFloor;
  vm.addRoom = addRoom;
  vm.addTerminal = addTerminal;
  vm.addPassageway = addPassageway;
  vm.getMap = getMap;

  function onInit() {
    vm.container = angular.element(document.querySelector("#container"));
    delete vm.model.passageway; //fix in API
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

  function addRoom() {
    vm.room = {};
    vm.model.rooms.push(vm.room);
  }

  function addTerminal() {
    vm.model.terminal = {};
    vm.model.terminal.coordinate = {};
  }

  function addPassageway() {
    vm.model.passageway = {};
    vm.model.passageway.coordinate = {};
  }

  function saveFloor() {
    if (!Object.keys(vm.model.terminal.coordinate).length) {
      delete vm.model.terminal;
    }
    vm.model.$save().then(function () {
      $state.reload();
    });
  }

}
